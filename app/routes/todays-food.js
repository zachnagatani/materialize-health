import Ember from 'ember';

export default Ember.Route.extend({
	// Inject the default data from my health-data service
	healthData: Ember.inject.service('health-data'),

	// Hook the health-data service in as a model to use on my page
	model() {
		return this.get('healthData');
	},

	actions: {
		removeItem(index) {
			var self = this;

			// Store property paths for easy access
			let todaysPath = this.get('healthData').todaysFood;
			let caloriesPath = 'healthData.calories';

  			this.set(caloriesPath, this.get(caloriesPath) - Math.round(todaysPath[index].fields.nf_calories));

  			todaysPath.removeObject(todaysPath[index]);

  			// Because Ember adds its own meta-object to the array,
  			// check to see if its length is zero. The length property
  			// still accurately reflects our data. If length is zero
  			// set the foodAdded property to false in order to remove
  			// the table from our display
  			if (todaysPath.length === 0) {
  				self.set('healthData.foodAdded', false);
  			}
		},

		hideResults() {
			this.transitionTo('application');
			this.set('healthData.onAppRoute', true);
		}
	}
});