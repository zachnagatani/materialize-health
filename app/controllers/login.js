import Ember from 'ember';

const { inject:  { service } } = Ember;

export default Ember.Controller.extend({
  session: service(),

  actions: {
    signInSuccess() {
      this.get('session').fetch().then(() => this.replaceRoute('search-results'));
    },
  }
});