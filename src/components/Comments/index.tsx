import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { Avatar, Card, IconButton, Modal, Portal, TextInput, Text, Chip } from 'react-native-paper';

import { styles } from './styles';

import { usePetsContext } from '~/context/petsContext';
import { createComment, deleteComment, updateComment } from '~/services/MissingPets/comments';
import { MissingPetType } from '~/types/missingPetTypes';
import { getUserToken } from '~/utils/getUserToken';

type CommentsProps = {
  visible: boolean;
  hideModal: () => void;
  item: MissingPetType;
};

export const Comments = ({ visible, hideModal, item }: CommentsProps) => {
  const { loggedUser, comments, setComments } = usePetsContext();

  const [textInput, setTextInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);

  const commentInput = useRef(null);

  useEffect(() => {
    if (comments.length === 0) setComments(item.comments);
  }, []);

  useEffect(() => {
    setTextInput('');
    setEditingCommentId(null);
  }, [visible]);

  const formattedDate = format(new Date(), 'dd/MM/yyyy');

  const handleAddComment = async (content: string) => {
    if (content === '') return;

    try {
      const autCookie = await getUserToken();

      if (!autCookie) return;

      const newComment = await createComment(
        {
          missingPetId: item.id,
          content,
        },
        autCookie
      );

      newComment.user = loggedUser;

      setComments([...comments, newComment]);
      setTextInput('');
    } catch (err) {
      console.error(`Erro ${err.response?.data}`);
    }
  };

  const handleDeleteComment = async (id: string) => {
    Alert.alert('', 'Tem certeza que deseja excluir?', [
      {
        text: 'Cancelar',
        style: 'cancel',
        onPress: () => {},
      },
      {
        text: 'Excluir',
        onPress: async () => {
          try {
            const autCookie = await getUserToken();

            if (!autCookie) return;

            await deleteComment(id, autCookie);

            setComments(comments.filter((comment) => comment.id !== id));
            setTextInput('');
          } catch (err) {
            console.error(`Erro ${err.response?.data}`);
          }
        },
      },
    ]);
  };

  const handleEditComment = (id: string) => {
    commentInput.current.focus();

    setEditingCommentId(id);

    const commentToEdit = comments.find((comment) => comment.id === id);

    if (commentToEdit) setTextInput(commentToEdit.content);
  };

  const handleSaveEditComment = async () => {
    if (!editingCommentId) return;

    try {
      const autCookie = await getUserToken();

      if (!autCookie) return;

      const updatedComments = comments.map((comment) => {
        if (comment.id === editingCommentId) {
          return { ...comment, content: textInput };
        }

        return comment;
      });

      await updateComment(
        editingCommentId,
        {
          content: textInput,
        },
        autCookie
      );

      setComments(updatedComments);
      setEditingCommentId(null);
      setTextInput('');
    } catch (err) {
      console.error('Error ', err.response?.data);
    }
  };

  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={styles.modalContainer}>
        <View style={styles.modalHeaderContainer}>
          <IconButton icon="close" size={30} onTouchStart={hideModal} />
          <Text variant="titleLarge" style={styles.modalTitle}>
            Comentários
          </Text>
        </View>
        <View style={styles.modalCardContainer}>
          <ScrollView>
            {comments.length > 0 &&
              comments.map((comment, index: number) => {
                const isUserComment = comment.user.id === loggedUser.id;

                if (comment.missingPetId === item.id) {
                  return (
                    <>
                      <Card key={index} style={styles.modalCard}>
                        <Card.Title
                          title={comment.user.userName}
                          subtitle={formattedDate}
                          titleVariant="titleSmall"
                          subtitleVariant="labelSmall"
                          left={(props) => (
                            <Avatar.Icon
                              {...props}
                              icon="account"
                              style={{ backgroundColor: '#ededed' }}
                            />
                          )}
                          right={(props) => (
                            <>
                              {isUserComment && (
                                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                  {editingCommentId !== comment.id && (
                                    <IconButton
                                      {...props}
                                      icon="pencil"
                                      size={15}
                                      style={{ paddingLeft: 10 }}
                                      onPress={() => handleEditComment(comment.id)}
                                    />
                                  )}
                                  <IconButton
                                    {...props}
                                    icon="trash-can-outline"
                                    size={15}
                                    style={{ paddingRight: 10 }}
                                    onPress={() => handleDeleteComment(comment.id)}
                                  />
                                </View>
                              )}
                            </>
                          )}
                        />
                        <Card.Content>
                          <Text>
                            {editingCommentId && editingCommentId === comment.id
                              ? textInput
                              : comment.content}
                          </Text>
                        </Card.Content>
                      </Card>
                      <Chip icon="chat-processing-outline" style={styles.answerComment}>
                        Responder...
                      </Chip>
                    </>
                  );
                }
              })}
          </ScrollView>
        </View>
        {Platform.OS === 'android' ? (
          <View style={styles.modalInputContainerAndroid}>
            <TextInput
              placeholder="Digite o comentário..."
              maxLength={100}
              value={textInput}
              onChangeText={(text) => setTextInput(text)}
              mode="outlined"
              returnKeyType="done"
              ref={commentInput}
            />
            {textInput !== '' && (
              <IconButton
                size={22}
                icon="check"
                style={styles.modalInputContainerIcon}
                onPress={() => {
                  if (editingCommentId) handleSaveEditComment();
                  else handleAddComment(textInput);
                }}
              />
            )}
          </View>
        ) : (
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.modalInputContainerIOS}>
              <TextInput
                placeholder="Digite o comentário..."
                maxLength={100}
                value={textInput}
                onChangeText={(text) => setTextInput(text)}
                mode="outlined"
                returnKeyType="done"
                ref={commentInput}
              />
              <IconButton
                size={22}
                icon="check"
                style={styles.modalInputContainerIcon}
                onPress={() => {
                  if (editingCommentId) handleSaveEditComment();
                  else handleAddComment(textInput);
                }}
              />
            </View>
          </KeyboardAvoidingView>
        )}
      </Modal>
    </Portal>
  );
};
