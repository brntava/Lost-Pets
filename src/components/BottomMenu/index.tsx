import { useEffect, useState } from 'react';
import { BottomNavigation } from 'react-native-paper';

import { usePetsContext } from '~/context/petsContext';
import { CreateLostPetPost } from '~/pages/createLostPetPost';
import { Feed } from '~/pages/feed';
import { SearchSighting } from '~/pages/searchSighting';

const HomeRoute = () => <Feed />;
const AddPostRoute = () => <CreateLostPetPost />;
const SearchMapRoute = () => <SearchSighting />;

export const BottomMenu = () => {
  const { missingPetPost, tabIndex, setTabIndex, visitorUser } = usePetsContext();

  const [routes, setRoutes] = useState([
    { key: 'home', focusedIcon: 'home' },
    { key: 'search', focusedIcon: 'map-marker' },
  ]);

  useEffect(() => {
    if (!visitorUser) {
      setRoutes((prevRoutes) => [
        { key: 'home', focusedIcon: 'home' },
        { key: 'addPost', focusedIcon: 'plus' },
        { key: 'search', focusedIcon: 'map-marker' },
      ]);
    }
  }, [visitorUser]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    addPost: AddPostRoute,
    search: SearchMapRoute,
  });

  useEffect(() => {
    if (missingPetPost.length === 0) return;

    setTabIndex(0);
  }, [missingPetPost]);

  return (
    <BottomNavigation
      navigationState={{ index: tabIndex, routes }}
      onIndexChange={setTabIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#228c80', height: 50 }}
      activeIndicatorStyle={{ backgroundColor: '#fff' }}
      inactiveColor="#fff"
    />
  );
};
