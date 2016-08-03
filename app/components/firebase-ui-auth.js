/* globals firebaseui */
import Ember from 'ember';
import firebase from 'firebase';

const { computed, inject: { service } } = Ember;

export default Ember.Component.extend({
  firebaseApp: service(),

  didInsertElement() {
    this._super(...arguments);
    this._initializeAuthUI();
  },

  signInSuccess() {},

  uiConfig: computed('signInSuccess', function () {
    return {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccess: this.get('signInSuccess'),
      },
    };
  }),

  elementId: 'firebaseui-auth-container',

  _initializeAuthUI() {
    const auth = this.get('firebaseApp').auth();
    const ui = new firebaseui.auth.AuthUI(auth);
    ui.start('#firebaseui-auth-container', this.get('uiConfig'));
    this.set('ui', ui);
  },
});
