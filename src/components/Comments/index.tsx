import { useEffect, useRef, useState } from 'react';
import { View, ScrollView, Platform, Alert, Keyboard } from 'react-native';
import {
  Avatar,
  Card,
  IconButton,
  Modal,
  Portal,
  TextInput,
  Text,
  Chip,
  Menu,
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

const URL = process.env.URL;

export const Comments = ({ visible, hideModal, item }: CommentsProps) => {
  const { loggedUser, comments, setComments, visitorUser, userImage } = usePetsContext();

  const [textInput, setTextInput] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string>('');
  const [editingAwnserCommentId, setEditingAwnserCommentId] = useState<any>(null);

  const [isAwnser, setIsAwnser] = useState(false);
  const [commentId, setCommentId] = useState('');

  const [optionsVisible, setOptionsVisible] = useState(false);
  const [awnserOptionsVisible, setAwnserOptionsVisible] = useState(false);

  const openMenu = () => setOptionsVisible(true);
  const closeMenu = () => setOptionsVisible(false);

  const openAwnserMenu = () => setAwnserOptionsVisible(true);
  const closeAwnserMenu = () => setAwnserOptionsVisible(false);

  const commentInput = useRef(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const imageUri = userImage?.uri ?? item.user.image?.url?.replace('http://localhost:5241', URL);

  useEffect(() => {
    if (comments.length === 0) setComments(item.comments);

    const keyboardShowEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const keyboardHideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const keyboardDidShowListener = Keyboard.addListener(keyboardShowEvent, (event) => {
      setKeyboardHeight(event.endCoordinates.height - 70);
    });

    const keyboardDidHideListener = Keyboard.addListener(keyboardHideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
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

      setComments((prevComments: CommentsType[]) => {
        if (isAwnser) {
          return prevComments.map((comment: CommentsType) => {
            if (comment?.id === commentId) {
              return {
                ...comment,
                awnsers: [...(comment.awnsers || []), newComment],
              };
            }
            return comment;
          });
        } else {
          return [...prevComments, newComment];
        }
      });
      setCommentId('');
      setTextInput('');
      setIsAwnser(false);
    } catch (err) {
      console.error(`Erro ${err.response?.data}`);
    }
  };

  const handleDeleteComment = async (id: string, awnserId?: string) => {
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

            setComments((prevComments: CommentsType[]) => {
              if (awnserId) {
                return prevComments.map((comment) => {
                  if (comment.id === id) {
                    return {
                      ...comment,
                      awnsers: comment.awnsers.filter((awnser) => awnser.id !== awnserId),
                    };
                  }
                  return comment;
                });
              } else {
                return prevComments.filter((comment) => comment.id !== id);
              }
            });
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

    const commentToEdit = comments.find((comment: CommentsType) => comment.id === id);

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
        !commentAwnser?.id ? editingCommentId : commentAwnser.id,
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
        <View
          style={[styles.modalCardContainer, visitorUser ? { paddingTop: 0, height: '90%' } : {}]}>
          <ScrollView ref={scrollViewRef}>
            {comments.length > 0 &&
              comments.map((comment: CommentsType, index: number) => {
                const isUserComment = comment.user.id === loggedUser?.id;

                if (comment.missingPetId === item.id) {
                  return (
                    <>
                      <Card
                        key={index}
                        style={[
                          styles.modalCard,
                          visitorUser ? { marginTop: 20 } : {},
                          visitorUser && comment.awnsers.length === 0
                            ? { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }
                            : {},
                        ]}>
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
                            <>
                              {imageUri ? (
                                <Avatar.Image
                                  {...props}
                                  source={{
                                    uri: imageUri,
                                  }}
                                  size={45}
                                />
                              ) : (
                                <Avatar.Icon
                                  size={45}
                                  icon="account"
                                  style={{ backgroundColor: 'lightgray' }}
                                />
                              )}
                            </>
                          )}
                          right={(props) => (
                            <>
                              {isUserComment && (
                                <Menu
                                  visible={optionsVisible}
                                  onDismiss={closeMenu}
                                  style={{ marginTop: 20 }}
                                  contentStyle={{ backgroundColor: '#fffafa' }}
                                  anchor={
                                    <IconButton
                                      {...props}
                                      icon="dots-vertical"
                                      size={20}
                                      onPress={openMenu}
                                      style={{ paddingRight: 10 }}
                                    />
                                  }>
                                  {editingCommentId !== comment.id && (
                                    <Menu.Item
                                      onPress={() => {
                                        handleEditComment(comment.id);
                                        closeMenu();
                                      }}
                                      title="Editar"
                                      leadingIcon="pencil"
                                    />
                                  )}
                                  <Menu.Item
                                    onPress={() => {
                                      handleDeleteComment(comment.id);
                                      closeMenu();
                                    }}
                                    title="Excluir"
                                    leadingIcon="trash-can-outline"
                                  />
                                </Menu>
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
                              <View style={[styles.answerCommentContainer]} key={index}>
                                <View style={{ marginLeft: 6 }}>
                                  {imageUri ? (
                                    <Avatar.Image
                                      source={{
                                        uri: imageUri,
                                      }}
                                      size={38}
                                    />
                                  ) : (
                                    <Avatar.Icon
                                      size={38}
                                      icon="account"
                                      style={{ backgroundColor: 'lightgray' }}
                                    />
                                  )}
                                </View>
                                <View style={{ flexDirection: 'column' }}>
                                  <View style={styles.answerCommentHeader}>
                                    <Text style={styles.answerCommentHeaderText}>
                                      {awnser.user.userName}
                                      {' - '}
                                      {new Date(awnser.createdAt).toLocaleString('pt-br', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                      })}
                                    </Text>
                                    {isUserAwnser && (
                                      <>
                                        <Menu
                                          visible={awnserOptionsVisible}
                                          onDismiss={closeAwnserMenu}
                                          contentStyle={{
                                            backgroundColor: '#fffafa',
                                            marginTop: 20,
                                          }}
                                          anchor={
                                            <IconButton
                                              icon="dots-vertical"
                                              size={20}
                                              onPress={openAwnserMenu}
                                              style={{ paddingRight: 10 }}
                                            />
                                          }>
                                          {editingAwnserCommentId !== awnser.id && (
                                            <Menu.Item
                                              onPress={() => {
                                                handleEditComment(comment.id, awnser.id);
                                                closeAwnserMenu();
                                              }}
                                              title="Editar"
                                              leadingIcon="pencil"
                                            />
                                          )}
                                          <Menu.Item
                                            onPress={() => {
                                              handleDeleteComment(comment.id, awnser.id);
                                              closeAwnserMenu();
                                            }}
                                            title="Excluir"
                                            leadingIcon="trash-can-outline"
                                          />
                                        </Menu>
                                      </>
                                    )}
                                  </View>
                                  <View style={styles.answerCommentContent}>
                                    <Text
                                      style={[
                                        styles.answerCommentContentText,
                                        visitorUser ? { marginTop: 8 } : {},
                                      ]}>
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
                      {!visitorUser && (
                        <Chip
                          icon={() => (
                            <Icon size={20} source="chat-processing-outline" color="#228c80" />
                          )}
                          onPress={() => {
                            setIsAwnser(true);
                            setCommentId(comment.id);

                            commentInput.current.focus();
                          }}
                          style={styles.answerCommentChip}>
                          Responder...
                        </Chip>
                      )}
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
              <View style={[styles.modalInputContainerIOS, { bottom: keyboardHeight }]}>
                <TextInput
                  placeholder="Digite o comentário..."
                  maxLength={100}
                  value={textInput}
                  onChangeText={(text) => setTextInput(text)}
                  mode="outlined"
                  returnKeyType="done"
                  ref={commentInput}
                  onFocus={() => {
                    scrollViewRef.current?.scrollToEnd({ animated: true });
                  }}
                />
                <IconButton
                  size={22}
                  icon="check"
                  style={styles.modalInputContainerIcon}
                  onPress={() => {
                    if (editingAwnserCommentId?.commentAwnser.id || editingCommentId !== '')
                      handleSaveEditComment();
                    else handleAddComment(textInput);

                    Keyboard.dismiss();
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
