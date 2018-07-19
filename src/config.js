import * as actions from './actions';
import store from './store';

export default {
  albums: {
    initPlay: href => store.dispatch(actions.startAlbum({ href })),
    onMount: () => store.dispatch(actions.fetchNewReleases()),
    sectionMessage: 'New Albums and Singles',
    selection: 'newReleases',
  },
  category: {
    initPlay: href => store.dispatch(actions.startPlaylist({ href })),
    onMount: id => store.dispatch(actions.fetchCategoryPlaylist(id)),
    onUnmount: () => store.dispatch(actions.clearCategoryPlaylist()),
    sectionMessage: 'Popular Playlists',
    selection: 'categoryPlaylist',
  },
  featured: {
    initPlay: href => store.dispatch(actions.startPlaylist({ href })),
    onMount: () => store.dispatch(actions.fetchFeatured()),
    selection: 'featured',
  },
};
