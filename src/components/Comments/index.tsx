import { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import {
  Avatar,
  Card,
  IconButton,
  Modal,
  Portal,
  TextInput,
  Text,
  Chip,
  Icon,
} from 'react-native-paper';

import { styles } from './styles';

import { usePetsContext } from '~/context/petsContext';
import { createComment, deleteComment, updateComment } from '~/services/MissingPets/comments';
import { CommentsType } from '~/types/commentTypes';
import { MissingPetType } from '~/types/missingPetTypes';
import { getUserToken } from '~/utils/getUserToken';

type CommentsProps = {
  visible: boolean;
  hideModal: () => void;
  item: MissingPetType;
};

export const Comments = ({ visible, hideModal, item }: CommentsProps) => {
  const { loggedUser, comments, setComments, visitorUser } = usePetsContext();

  const [textInput, setTextInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string>('');
  const [editingAwnserCommentId, setEditingAwnserCommentId] = useState<any>(null);

  const [isAwnser, setIsAwnser] = useState(false);
  const [commentId, setCommentId] = useState('');

  const commentInput = useRef(null);

  useEffect(() => {
    if (comments.length === 0) setComments(item.comments);
  }, []);

  useEffect(() => {
    setTextInput('');
    setEditingCommentId('');
  }, [visible]);

  const handleAddComment = async (content: string) => {
    if (content === '') return;

    try {
      const autCookie = await getUserToken();

      if (!autCookie) return;

      const newComment = await createComment(
        {
          missingPetId: item.id,
          content,
          ...(isAwnser ? { awnsersTo: commentId } : {}),
        },
        autCookie
      );

      newComment.user = loggedUser;

      setComments([...comments, newComment]);
      setCommentId('');
      setTextInput('');
      setIsAwnser(false);
    } catch (err) {
      console.error(`Erro ${err.response?.data}`);
    }
  };

  const handleDeleteComment = async (id: string, awnserId?: string) => {
    // ARRUMAR UPDATE DOS COMENTARIOS

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

            await deleteComment(awnserId ?? id, autCookie);

            setComments(comments.filter((comment) => comment.id !== id));
            setTextInput('');
          } catch (err) {
            console.error(`Erro ${err.response?.data}`);
          }
        },
      },
    ]);
  };

  const handleEditComment = (id: string, awnserId?: string) => {
    commentInput.current.focus();

    const commentToEdit = comments.find((comment) => comment.id === id);

    if (commentToEdit && !awnserId) {
      setEditingCommentId(id);
      setTextInput(commentToEdit.content);
    }

    let commentAwnser;

    if (awnserId) {
      commentAwnser = commentToEdit.awnsers.find((awnser: CommentsType) => awnser.id === awnserId);

      setEditingAwnserCommentId({
        commentId: commentToEdit.id,
        commentAwnser,
      });

      setTextInput(commentAwnser.content);
    }
  };

  const handleSaveEditComment = async () => {
    const commentAwnser = editingAwnserCommentId?.commentAwnser;

    const updatedComments = comments.map((comment: CommentsType) => {
      if (comment.id === editingAwnserCommentId?.commentId || comment.id === editingCommentId) {
        return {
          ...comment,
          ...(editingCommentId !== '' ? { content: textInput } : {}),
          awnsers: comment.awnsers.map((awnser: CommentsType) =>
            awnser?.id === commentAwnser?.id ? { ...awnser, content: textInput } : awnser
          ),
        };
      }

      return comment;
    });

    const body = {
      content: textInput,
      ...(commentAwnser?.id ? { awnsersTo: commentAwnser?.awnsersTo } : {}),
    };

    try {
      const autCookie = await getUserToken();

      if (!autCookie) return;

      await updateComment(
        commentAwnser?.id === '' ? editingCommentId : commentAwnser.id,
        body,
        autCookie
      );

      setComments(updatedComments);
      setEditingCommentId('');
      setEditingAwnserCommentId({
        commentAwnser: {
          id: '',
        },
      });
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
              comments.map((comment: CommentsType, index: number) => {
                const isUserComment = comment.user.id === loggedUser?.id;

                if (comment.missingPetId === item.id) {
                  return (
                    <>
                      <Card key={index} style={styles.modalCard}>
                        <Card.Title
                          title={comment.user.userName}
                          subtitle={new Date(comment.createdAt).toLocaleString('pt-br', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
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
                            {editingCommentId === comment.id ? textInput : comment.content}
                          </Text>
                        </Card.Content>
                      </Card>
                      {comment.awnsers.length > 0 && (
                        <>
                          {comment.awnsers.map((awnser: any, index: number) => {
                            const isUserAwnser = awnser.user.id === loggedUser?.id;

                            return (
                              <View style={styles.answerCommentContainer} key={index}>
                                <View style={{ marginLeft: 10 }}>
                                  <Icon source="account" size={20} />
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                  <View style={styles.answerCommentHeader}>
                                    <Text style={styles.answerCommentHeaderText}>
                                      {awnser.user.userName} {' - '}
                                      {new Date(awnser.createdAt).toLocaleDateString('pt-br')}
                                    </Text>
                                    {isUserAwnser && (
                                      <View style={{ flexDirection: 'row', marginLeft: 50 }}>
                                        {editingAwnserCommentId !== awnser.id && (
                                          <IconButton
                                            icon="pencil"
                                            size={12}
                                            style={{ paddingLeft: 10 }}
                                            onPress={() => handleEditComment(comment.id, awnser.id)}
                                          />
                                        )}
                                        <IconButton
                                          icon="trash-can-outline"
                                          size={12}
                                          style={{ paddingRight: 10 }}
                                          onPress={() => handleDeleteComment(comment.id, awnser.id)}
                                        />
                                      </View>
                                    )}
                                  </View>
                                  <View style={styles.answerCommentContent}>
                                    <Text style={styles.answerCommentContentText}>
                                      {editingAwnserCommentId?.commentAwnser.id === awnser.id
                                        ? textInput
                                        : awnser.content}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            );
                          })}
                        </>
                      )}
                      <Chip
                        icon="chat-processing-outline"
                        onPress={() => {
                          setIsAwnser(true);
                          setCommentId(comment.id);

                          commentInput.current.focus();
                        }}
                        style={styles.answerCommentChip}>
                        Responder...
                      </Chip>
                    </>
                  );
                }
              })}
          </ScrollView>
        </View>
        {!visitorUser && (
          <>
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
                      if (editingCommentId !== '') handleSaveEditComment();
                      else handleAddComment(textInput);
                    }}
                  />
                )}
              </View>
            ) : (
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
                    if (editingAwnserCommentId?.commentAwnser.id || editingCommentId !== '')
                      handleSaveEditComment();
                    else handleAddComment(textInput);
                  }}
                />
              </View>
            )}
          </>
        )}
      </Modal>
    </Portal>
  );
};
