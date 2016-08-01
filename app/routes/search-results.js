import Ember from 'ember';

export default Ember.Route.extend({
	// Inject the default data from my health-data service
	healthData: Ember.inject.service('health-data'),

	// Hook the health-data service in as a model to use on my page
	model() {
		return this.get('healthData');
	},

	actions: {
		addCalories(index) {
			let store = this.get('store');

			// Store correct properties for easy access
			let caloriesPath = 'healthData.calories';
			let resultsPath = this.get('healthData').results;

			// Use the index of the item being clicked in the search
			// results to push that item into healthData.todaysFood
			this.get('healthData').todaysFood.pushObject(resultsPath[index]);

			// Set healthData.calories to itself plus the amount of calories
			// contained the food item selected by the user
  			this.set(caloriesPath, this.get(caloriesPath) + Math.round(resultsPath[index].fields.nf_calories));

  			this.set('healthData.foodAdded', true);

  			let newItem = store.createRecord('item', {
  				name: resultsPath[index].fields.item_name,
  				calories: resultsPath[index].fields.nf_calories
  			});

  			newItem.save();
		},

		hideResults() {
			this.set('healthData.onAppRoute', true);
			this.transitionTo('application');
		}
	},
});