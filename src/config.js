import * as actions from './actions';
import store from './store';

export default {
  albums: {
    onMount: () => store.dispatch(actions.fetchNewReleases()),
    initPlay: href => store.dispatch(actions.startAlbum({ href })),
    selection: 'newReleases',
    sectionMessage: 'New Albums and Singles',
  },
  category: {
    onMount: id => store.dispatch(actions.fetchCategoryPlaylist(id)),
    onUnmount: () => store.dispatch(actions.clearCategoryPlaylist()),
    initPlay: href => store.dispatch(actions.startPlaylist({ href })),
    selection: 'categoryPlaylist',
    sectionMessage: 'Popular Playlists',
  },
  featured: {
    onMount: () => store.dispatch(actions.fetchFeatured()),
    initPlay: href => store.dispatch(actions.startPlaylist({ href })),
    selection: 'featured',
  },
};
