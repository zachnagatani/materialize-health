"use strict";define("materialize-health/adapters/application",["exports","emberfire/adapters/firebase"],function(e,t){e.default=t.default.extend({})}),define("materialize-health/app",["exports","ember","materialize-health/resolver","ember-load-initializers","materialize-health/config/environment"],function(e,t,a,n,r){var l=void 0;t.default.MODEL_FACTORY_INJECTIONS=!0,l=t.default.Application.extend({modulePrefix:r.default.modulePrefix,podModulePrefix:r.default.podModulePrefix,Resolver:a.default}),(0,n.default)(l,r.default.modulePrefix),e.default=l}),define("materialize-health/components/app-version",["exports","ember-cli-app-version/components/app-version","materialize-health/config/environment"],function(e,t,a){var n=a.default.APP.name,r=a.default.APP.version;e.default=t.default.extend({version:r,name:n})}),define("materialize-health/components/calorie-count",["exports","ember"],function(e,t){e.default=t.default.Component.extend({store:t.default.inject.service(),model:function(){return this.store.find("calories","userCals")}})}),define("materialize-health/components/custom-item",["exports","ember"],function(e,t){e.default=t.default.Component.extend({healthData:t.default.inject.service("health-data"),model:function(){return this.get("healthData")},store:t.default.inject.service(),actions:{openModal:function(){$("#custom-item-modal").openModal()},addCalories:function(e){var t="healthData.calories",a=this.get("healthData").results;this.get("healthData").todaysFood.pushObject(a[e]),this.set(t,this.get(t)+Math.round(a[e].fields.nf_calories)),this.set("healthData.foodAdded",!0)},createItem:function(){var e=this;$("#custom-item-name").val()&&$("#custom-item-calories").val()?!function(){var t=Math.round(Number($("#custom-item-calories").val()));console.log(t);var a=e.get("store");a.findRecord("foodAdded","userFoodAddedStatus").then(function(e){console.log(e)});var n=a.createRecord("item",{name:$("#custom-item-name").val(),calories:t});a.findRecord("calories","userCals").then(function(e){e.set("total",e.get("total")+t),e.save()}),n.save()}():alert("Please enter an item name and calorie count.")}}})}),define("materialize-health/helpers/pluralize",["exports","ember-inflector/lib/helpers/pluralize"],function(e,t){e.default=t.default}),define("materialize-health/helpers/singularize",["exports","ember-inflector/lib/helpers/singularize"],function(e,t){e.default=t.default}),define("materialize-health/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","materialize-health/config/environment"],function(e,t,a){e.default={name:"App Version",initialize:(0,t.default)(a.default.APP.name,a.default.APP.version)}}),define("materialize-health/initializers/container-debug-adapter",["exports","ember-resolver/container-debug-adapter"],function(e,t){e.default={name:"container-debug-adapter",initialize:function(){var e=arguments[1]||arguments[0];e.register("container-debug-adapter:main",t.default),e.inject("container-debug-adapter:main","namespace","application:main")}}}),define("materialize-health/initializers/data-adapter",["exports","ember"],function(e,t){e.default={name:"data-adapter",before:"store",initialize:t.default.K}}),define("materialize-health/initializers/ember-data",["exports","ember-data/setup-container","ember-data/-private/core"],function(e,t,a){e.default={name:"ember-data",initialize:t.default}}),define("materialize-health/initializers/emberfire",["exports","emberfire/initializers/emberfire"],function(e,t){e.default=t.default}),define("materialize-health/initializers/export-application-global",["exports","ember","materialize-health/config/environment"],function(e,t,a){function n(){var e=arguments[1]||arguments[0];if(a.default.exportApplicationGlobal!==!1){var n,r=a.default.exportApplicationGlobal;n="string"==typeof r?r:t.default.String.classify(a.default.modulePrefix),window[n]||(window[n]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete window[n]}}))}}e.initialize=n,e.default={name:"export-application-global",initialize:n}}),define("materialize-health/initializers/injectStore",["exports","ember"],function(e,t){e.default={name:"injectStore",before:"store",initialize:t.default.K}}),define("materialize-health/initializers/store",["exports","ember"],function(e,t){e.default={name:"store",after:"ember-data",initialize:t.default.K}}),define("materialize-health/initializers/transforms",["exports","ember"],function(e,t){e.default={name:"transforms",before:"store",initialize:t.default.K}}),define("materialize-health/instance-initializers/ember-data",["exports","ember-data/-private/instance-initializers/initialize-store-service"],function(e,t){e.default={name:"ember-data",initialize:t.default}}),define("materialize-health/models/calories",["exports","ember-data"],function(e,t){e.default=t.default.Model.extend({total:t.default.attr("number")})}),define("materialize-health/models/food-added",["exports","ember-data"],function(e,t){e.default=t.default.Model.extend({status:t.default.attr("boolean")})}),define("materialize-health/models/item",["exports","ember-data"],function(e,t){e.default=t.default.Model.extend({name:t.default.attr(),calories:t.default.attr()})}),define("materialize-health/resolver",["exports","ember-resolver"],function(e,t){e.default=t.default}),define("materialize-health/router",["exports","ember","materialize-health/config/environment"],function(e,t,a){var n=t.default.Router.extend({location:a.default.locationType});n.map(function(){this.route("search-results"),this.route("todays-food"),this.route("add-custom-item")}),e.default=n}),define("materialize-health/routes/add-custom-item",["exports","ember"],function(e,t){e.default=t.default.Route.extend({})}),define("materialize-health/routes/application",["exports","ember"],function(e,t){e.default=t.default.Route.extend({healthData:t.default.inject.service("health-data"),model:function(){return this.store.findAll("calories")},healthData:t.default.inject.service(),actions:{getResults:function(){var e=this,t="https://api.nutritionix.com/v1_1/search/"+$("#food-search").val()+"?results=0%3A20&cal_min=0&cal_max=50000&fields=item_name%2Cnf_calories&appId=f9261c61&appKey=fcf83f625641eb2e88ab325848e09e01",a=this.get("healthData").results;$.get(t).then(function(t){if(t.total_hits&&$("#food-search").val()){e.transitionTo("search-results"),e.set("healthData.searched",!0),e.set("healthData.onAppRoute",!1),a.length=0;t.hits.forEach(function(e){a.pushObject(e)}),console.log(t)}else alert("Please enter a actual FOOD!!!")}).fail(function(){alert("CRAP")})},viewResults:function(){this.set("healthData.onAppRoute",!1),this.transitionTo("search-results")},viewTodaysFood:function(){this.set("healthData.onAppRoute",!1),this.transitionTo("todays-food")}}})}),define("materialize-health/routes/search-results",["exports","ember"],function(e,t){e.default=t.default.Route.extend({healthData:t.default.inject.service("health-data"),model:function(){return this.get("healthData")},actions:{addCalories:function(e){var t=this.get("store"),a=this.get("healthData").results;t.findRecord("foodAdded","userFoodAddedStatus").then(function(e){e.set("status",!0),e.save()});var n=t.createRecord("item",{name:a[e].fields.item_name,calories:Math.round(a[e].fields.nf_calories)});t.findRecord("calories","userCals").then(function(t){t.set("total",t.get("total")+Math.round(a[e].fields.nf_calories)),t.save(),console.log(t.get("total"))}),n.save()},hideResults:function(){this.set("healthData.onAppRoute",!0),this.transitionTo("application")}}})}),define("materialize-health/routes/todays-food",["exports","ember"],function(e,t){e.default=t.default.Route.extend({healthData:t.default.inject.service("health-data"),model:function(){return t.default.RSVP.hash({items:this.store.findAll("item"),healthData:this.get("healthData"),foodAdded:this.store.find("foodAdded","userFoodAddedStatus")})},actions:{removeItem:function(e){var t=this.get("store");t.findRecord("calories","userCals").then(function(t){t.set("total",t.get("total")-e.get("calories")),t.save(),console.log(t.get("total"))}),e.destroyRecord(),0===$(".item-row").length&&t.findRecord("foodAdded","userFoodAddedStatus").then(function(e){e.set("status",!1),e.save()})},hideResults:function(){this.transitionTo("application"),this.set("healthData.onAppRoute",!0)}}})}),define("materialize-health/services/ajax",["exports","ember-ajax/services/ajax"],function(e,t){Object.defineProperty(e,"default",{enumerable:!0,get:function(){return t.default}})}),define("materialize-health/services/firebase-app",["exports","emberfire/services/firebase-app"],function(e,t){e.default=t.default}),define("materialize-health/services/firebase",["exports","emberfire/services/firebase"],function(e,t){e.default=t.default}),define("materialize-health/services/health-data",["exports","ember"],function(e,t){e.default=t.default.Service.extend({searched:!1,foodAdded:!1,onAppRoute:!0,calories:0,results:[],todaysFood:[]})}),define("materialize-health/templates/add-custom-item",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{fragmentReason:{name:"missing-wrapper",problems:["wrong-type","multiple-nodes"]},revision:"Ember@2.6.2",loc:{source:null,start:{line:1,column:0},end:{line:13,column:0}},moduleName:"materialize-health/templates/add-custom-item.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createComment(" Modal Structure ");e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"id","modal1"),e.setAttribute(a,"class","modal");var n=e.createTextNode("\n");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","modal-content");var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createElement("h4"),l=e.createTextNode("Modal Header");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createElement("p"),l=e.createTextNode("A bunch of text");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","modal-footer");var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createElement("a");e.setAttribute(r,"href","#!"),e.setAttribute(r,"class"," modal-action modal-close waves-effect waves-green btn-flat");var l=e.createTextNode("Agree");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=new Array(1);return n[0]=e.createMorphAt(t,4,4,a),n},statements:[["content","outlet",["loc",[null,[12,0],[12,10]]]]],locals:[],templates:[]}}())}),define("materialize-health/templates/application",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){var e=function(){var e=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.6.2",loc:{source:null,start:{line:29,column:3},end:{line:35,column:3}},moduleName:"materialize-health/templates/application.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("\t\t\t\t");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","row");var n=e.createTextNode("\n\t\t\t\t\t");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","col s8 offset-s2 col m4 offset-m4");var r=e.createTextNode("\n\t\t\t\t\t\t");e.appendChild(n,r);var r=e.createElement("button");e.setAttribute(r,"class","btn btn-block blue darken-4");var l=e.createTextNode("View Search Results");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t\t\t\t\t");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\t\t\t\t");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=e.childAt(t,[1,1,1]),r=new Array(1);return r[0]=e.createElementMorph(n),r},statements:[["element","action",["viewResults"],[],["loc",[null,[32,50],[32,74]]]]],locals:[],templates:[]}}();return{meta:{fragmentReason:!1,revision:"Ember@2.6.2",loc:{source:null,start:{line:28,column:2},end:{line:36,column:2}},moduleName:"materialize-health/templates/application.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createComment("");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=new Array(1);return n[0]=e.createMorphAt(t,0,0,a),e.insertBoundary(t,0),e.insertBoundary(t,null),n},statements:[["block","if",[["get","model.onAppRoute",["loc",[null,[29,9],[29,25]]]]],[],0,null,["loc",[null,[29,3],[35,10]]]]],locals:[],templates:[e]}}();return{meta:{fragmentReason:!1,revision:"Ember@2.6.2",loc:{source:null,start:{line:1,column:0},end:{line:40,column:7}},moduleName:"materialize-health/templates/application.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("main"),n=e.createTextNode("\n\t");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","container");var r=e.createTextNode("\n\n\t\t");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("\n\n\t\t\t");e.appendChild(n,r);var r=e.createElement("div");e.setAttribute(r,"class","row");var l=e.createTextNode("\n\t\t\t\t");e.appendChild(r,l);var l=e.createElement("div");e.setAttribute(l,"class","col s8 offset-s2 col m4 offset-m4");var d=e.createTextNode("\n\t\t\t\t\t");e.appendChild(l,d);var d=e.createElement("button");e.setAttribute(d,"type","button"),e.setAttribute(d,"class","btn btn-block btn-lg btn-info  blue darken-4");var i=e.createTextNode("View Today's Food");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode("\n\t\t\t\t");e.appendChild(l,d),e.appendChild(r,l);var l=e.createTextNode("\n\t\t\t");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t\t");e.appendChild(n,r);var r=e.createElement("form");e.setAttribute(r,"onsubmit","return false");var l=e.createTextNode("\n\t\t\t");e.appendChild(r,l);var l=e.createElement("div");e.setAttribute(l,"class","row");var d=e.createTextNode("\n\t\t\t\t");e.appendChild(l,d);var d=e.createElement("div");e.setAttribute(d,"class","input-field col s12 col m8 offset-m2");var i=e.createTextNode("\n\t\t\t\t\t");e.appendChild(d,i);var i=e.createComment("");e.appendChild(d,i);var i=e.createTextNode("\n\t\t\t\t\t");e.appendChild(d,i);var i=e.createElement("label");e.setAttribute(i,"for","food-search");var o=e.createTextNode("Search For Food");e.appendChild(i,o),e.appendChild(d,i);var i=e.createTextNode("\n\t\t\t\t");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode("\n\t\t\t");e.appendChild(l,d),e.appendChild(r,l);var l=e.createTextNode("\n\n\t\t\t");e.appendChild(r,l);var l=e.createElement("div");e.setAttribute(l,"class","row");var d=e.createTextNode("\n\t\t\t\t");e.appendChild(l,d);var d=e.createElement("div");e.setAttribute(d,"class","col s8 offset-s2 col m4 offset-m4");var i=e.createTextNode("\n\t\t\t\t\t");e.appendChild(d,i);var i=e.createElement("button");e.setAttribute(i,"type","submit"),e.setAttribute(i,"class","btn btn-block blue");var o=e.createTextNode("Search");e.appendChild(i,o),e.appendChild(d,i);var i=e.createTextNode("\n\t\t\t\t");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode("\n\t\t\t");e.appendChild(l,d),e.appendChild(r,l);var l=e.createTextNode("\n\n\t\t\t");e.appendChild(r,l);var l=e.createComment("");e.appendChild(r,l);var l=e.createTextNode("\n\t\t");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\n");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("\n\t\t");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("\n\t");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n");return e.appendChild(a,n),e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=e.childAt(t,[0,1]),r=e.childAt(n,[3,1,1]),l=e.childAt(n,[5]),d=e.childAt(l,[3,1,1]),i=new Array(7);return i[0]=e.createMorphAt(n,1,1),i[1]=e.createElementMorph(r),i[2]=e.createMorphAt(e.childAt(l,[1,1]),1,1),i[3]=e.createElementMorph(d),i[4]=e.createMorphAt(l,5,5),i[5]=e.createMorphAt(n,7,7),i[6]=e.createMorphAt(n,9,9),i},statements:[["inline","calorie-count",[],["model",["subexpr","@mut",[["get","model",["loc",[null,[4,24],[4,29]]]]],[],[]]],["loc",[null,[4,2],[4,31]]]],["element","action",["viewTodaysFood"],[],["loc",[null,[8,79],[8,106]]]],["inline","input",[],["id","food-search","type","text","class","form-control","enter","getResults"],["loc",[null,[14,5],[14,84]]]],["element","action",["getResults"],[],["loc",[null,[21,13],[21,36]]]],["inline","custom-item",[],["model",["subexpr","@mut",[["get","model",["loc",[null,[25,23],[25,28]]]]],[],[]]],["loc",[null,[25,3],[25,30]]]],["block","if",[["get","model.searched",["loc",[null,[28,8],[28,22]]]]],[],0,null,["loc",[null,[28,2],[36,9]]]],["content","outlet",["loc",[null,[38,2],[38,12]]]]],locals:[],templates:[e]}}())}),define("materialize-health/templates/components/calorie-count",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){var e=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.6.2",loc:{source:null,start:{line:3,column:2},end:{line:5,column:2}},moduleName:"materialize-health/templates/components/calorie-count.hbs"},isEmpty:!1,arity:1,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("\t\t");e.appendChild(t,a);var a=e.createElement("h2"),n=e.createComment("");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=new Array(1);return n[0]=e.createMorphAt(e.childAt(t,[1]),0,0),n},statements:[["content","calories.total",["loc",[null,[4,6],[4,24]]]]],locals:["calories"],templates:[]}}();return{meta:{fragmentReason:{name:"missing-wrapper",problems:["multiple-nodes","wrong-type"]},revision:"Ember@2.6.2",loc:{source:null,start:{line:1,column:0},end:{line:10,column:9}},moduleName:"materialize-health/templates/components/calorie-count.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","row");var n=e.createTextNode("\n\t");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","col s12 center-align");var r=e.createTextNode("\n");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("\t\t");e.appendChild(n,r);var r=e.createElement("h3"),l=e.createTextNode("Calories");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createComment("");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=new Array(2);return n[0]=e.createMorphAt(e.childAt(t,[0,1]),1,1),n[1]=e.createMorphAt(t,2,2,a),e.insertBoundary(t,null),n},statements:[["block","each",[["get","model",["loc",[null,[3,10],[3,15]]]]],[],0,null,["loc",[null,[3,2],[5,11]]]],["content","yield",["loc",[null,[10,0],[10,9]]]]],locals:[],templates:[e]}}())}),define("materialize-health/templates/components/custom-item",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){return{meta:{fragmentReason:{name:"missing-wrapper",problems:["multiple-nodes","wrong-type"]},revision:"Ember@2.6.2",loc:{source:null,start:{line:1,column:0},end:{line:39,column:0}},moduleName:"materialize-health/templates/components/custom-item.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","row");var n=e.createTextNode("\n\t");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","col s8 offset-s2 col m4 offset-m4");var r=e.createTextNode("\n\t\t");e.appendChild(n,r);var r=e.createElement("a");e.setAttribute(r,"type","submit"),e.setAttribute(r,"class","btn btn-block blue darken-4"),e.setAttribute(r,"href","custom-item-modal");var l=e.createTextNode("Add Custom Item");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createComment(" Modal Structure ");e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"id","custom-item-modal"),e.setAttribute(a,"class","modal");var n=e.createTextNode("\n\t");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","modal-content");var r=e.createTextNode("\n\t  ");e.appendChild(n,r);var r=e.createElement("h4");e.setAttribute(r,"class","center-align");var l=e.createTextNode("Add Custom Item");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t  ");e.appendChild(n,r);var r=e.createElement("form"),l=e.createTextNode("\n\t  \t");e.appendChild(r,l);var l=e.createElement("div");e.setAttribute(l,"class","row");var d=e.createTextNode("\n\t\t  \t");e.appendChild(l,d);var d=e.createElement("div");e.setAttribute(d,"class","input-field col s8 col offset-s2");var i=e.createTextNode("\n\t\t  \t\t");e.appendChild(d,i);var i=e.createComment("");e.appendChild(d,i);var i=e.createTextNode("\n\t\t  \t\t");e.appendChild(d,i);var i=e.createElement("label");e.setAttribute(i,"for","custom-item-name");var o=e.createTextNode("Item Name");e.appendChild(i,o),e.appendChild(d,i);var i=e.createTextNode("\n\t\t  \t");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode("\n\t  \t");e.appendChild(l,d),e.appendChild(r,l);var l=e.createTextNode("\n\n\t  \t");e.appendChild(r,l);var l=e.createElement("div");e.setAttribute(l,"class","row");var d=e.createTextNode("\n\t\t  \t");e.appendChild(l,d);var d=e.createElement("div");e.setAttribute(d,"class","input-field col s4 col offset-s4");var i=e.createTextNode("\n\t\t  \t\t");e.appendChild(d,i);var i=e.createComment("");e.appendChild(d,i);var i=e.createTextNode("\n\t\t  \t\t");e.appendChild(d,i);var i=e.createElement("label");e.setAttribute(i,"for","custom-item-calories");var o=e.createTextNode("Calories:");e.appendChild(i,o),e.appendChild(d,i);var i=e.createTextNode("\n\t\t  \t");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode("\n\t  \t");e.appendChild(l,d),e.appendChild(r,l);var l=e.createTextNode("\n\n\t  \t");e.appendChild(r,l);var l=e.createElement("div");e.setAttribute(l,"class","row");var d=e.createTextNode("\n\t\t\t");e.appendChild(l,d);var d=e.createElement("div");e.setAttribute(d,"class","col s8 offset-s2 col m4 offset-m4");var i=e.createTextNode("\n\t\t\t\t");e.appendChild(d,i);var i=e.createElement("a");e.setAttribute(i,"type","submit"),e.setAttribute(i,"class","btn btn-block blue"),e.setAttribute(i,"href","custom-item-modal");var o=e.createTextNode("Add");e.appendChild(i,o),e.appendChild(d,i);var i=e.createTextNode("\n\t\t\t");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode("\n\t\t");e.appendChild(l,d),e.appendChild(r,l);var l=e.createTextNode("\n\t  ");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\t");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","modal-footer");var r=e.createTextNode("\n\t  ");e.appendChild(n,r);var r=e.createElement("a");e.setAttribute(r,"class","modal-action modal-close waves-effect waves-green btn-flat");var l=e.createTextNode("Close");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=e.childAt(t,[0,1,1]),r=e.childAt(t,[4,1,3]),l=e.childAt(r,[5,1,1]),d=new Array(5);return d[0]=e.createElementMorph(n),d[1]=e.createMorphAt(e.childAt(r,[1,1]),1,1),d[2]=e.createMorphAt(e.childAt(r,[3,1]),1,1),d[3]=e.createElementMorph(l),d[4]=e.createMorphAt(t,6,6,a),d},statements:[["element","action",["openModal"],[],["loc",[null,[3,5],[3,27]]]],["inline","input",[],["id","custom-item-name","type","text","class","form-control","required",!0,"enter","getResults"],["loc",[null,[14,6],[14,104]]]],["inline","input",[],["id","custom-item-calories","type","number","class","form-control","required",!0,"enter","getResults"],["loc",[null,[21,6],[21,110]]]],["element","action",["createItem"],[],["loc",[null,[28,7],[28,30]]]],["content","yield",["loc",[null,[38,0],[38,9]]]]],locals:[],templates:[]}}())}),define("materialize-health/templates/search-results",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){var e=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.6.2",loc:{source:null,start:{line:18,column:3},end:{line:27,column:3}},moduleName:"materialize-health/templates/search-results.hbs"},isEmpty:!1,arity:2,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("\t\t\t\t");e.appendChild(t,a);var a=e.createElement("tr");e.setAttribute(a,"class","item-row");var n=e.createTextNode("\n\t\t\t\t\t");e.appendChild(a,n);var n=e.createElement("td");e.setAttribute(n,"class","item-name");var r=e.createComment("");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\t\t\t\t\t");e.appendChild(a,n);var n=e.createElement("td");e.setAttribute(n,"class","calories");var r=e.createComment("");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\t\t\t\t\t");e.appendChild(a,n);var n=e.createElement("td");e.setAttribute(n,"class","add-button");var r=e.createTextNode("\n");e.appendChild(n,r);var r=e.createTextNode("\t\t\t\t\t\t");e.appendChild(n,r);var r=e.createElement("button");e.setAttribute(r,"type","button"),e.setAttribute(r,"class","btn btn-add blue");var l=e.createTextNode("Add");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t\t\t\t\t");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\t\t\t\t");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=e.childAt(t,[1]),r=e.childAt(n,[5,2]),l=new Array(3);return l[0]=e.createMorphAt(e.childAt(n,[1]),0,0),l[1]=e.createMorphAt(e.childAt(n,[3]),0,0),l[2]=e.createElementMorph(r),l},statements:[["content","result.fields.item_name",["loc",[null,[20,27],[20,54]]]],["content","result.fields.nf_calories",["loc",[null,[21,26],[21,55]]]],["element","action",["addCalories",["get","index",["loc",[null,[24,76],[24,81]]]]],[],["loc",[null,[24,53],[24,83]]]]],locals:["result","index"],templates:[]}}();return{meta:{fragmentReason:{name:"missing-wrapper",problems:["multiple-nodes","wrong-type"]},revision:"Ember@2.6.2",loc:{source:null,start:{line:1,column:0},end:{line:33,column:10}},moduleName:"materialize-health/templates/search-results.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","row");var n=e.createTextNode("\n\t");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","col s8 offset-s2 col m4 offset-m4");var r=e.createTextNode("\n\t\t");e.appendChild(n,r);var r=e.createElement("button");e.setAttribute(r,"class","btn btn-block red darken-4");var l=e.createTextNode("Hide Results");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createElement("div");e.setAttribute(a,"class","row");var n=e.createTextNode("\n\t");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","col s10 offset-s1");var r=e.createTextNode("\n\t\t");e.appendChild(n,r);var r=e.createElement("table");e.setAttribute(r,"class","table"),e.setAttribute(r,"id","results-table");var l=e.createTextNode("\n\t\t\t");e.appendChild(r,l);var l=e.createElement("thead"),d=e.createTextNode("\n\t\t\t\t");e.appendChild(l,d);var d=e.createElement("th"),i=e.createTextNode("Name");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode("\n\t\t\t\t");e.appendChild(l,d);var d=e.createElement("th"),i=e.createTextNode("Calories (1 serving)");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode("\n\t\t\t\t");e.appendChild(l,d);var d=e.createElement("th"),i=e.createTextNode("Add to Daily Total");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode("\n\t\t\t");e.appendChild(l,d),e.appendChild(r,l);var l=e.createTextNode("\n\n\t\t\t");e.appendChild(r,l);var l=e.createElement("tbody"),d=e.createTextNode("\n");e.appendChild(l,d);var d=e.createComment("");e.appendChild(l,d);var d=e.createTextNode("\t\t\t");e.appendChild(l,d),e.appendChild(r,l);var l=e.createTextNode("\n\t\t");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n");e.appendChild(t,a);var a=e.createComment("");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=e.childAt(t,[0,1,1]),r=new Array(3);return r[0]=e.createElementMorph(n),r[1]=e.createMorphAt(e.childAt(t,[2,1,1,3]),1,1),r[2]=e.createMorphAt(t,4,4,a),e.insertBoundary(t,null),r},statements:[["element","action",["hideResults"],[],["loc",[null,[3,44],[3,68]]]],["block","each",[["get","model.results",["loc",[null,[18,11],[18,24]]]]],[],0,null,["loc",[null,[18,3],[27,12]]]],["content","outlet",["loc",[null,[33,0],[33,10]]]]],locals:[],templates:[e]}}())}),define("materialize-health/templates/todays-food",["exports"],function(e){e.default=Ember.HTMLBars.template(function(){var e=function(){var e=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.6.2",loc:{source:null,start:{line:21,column:3},end:{line:30,column:3}},moduleName:"materialize-health/templates/todays-food.hbs"},isEmpty:!1,arity:2,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createTextNode("\t\t\t\t");e.appendChild(t,a);var a=e.createElement("tr");e.setAttribute(a,"class","item-row");var n=e.createTextNode("\n\t\t\t\t\t");e.appendChild(a,n);var n=e.createElement("td");e.setAttribute(n,"class","item-name");var r=e.createComment("");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\t\t\t\t\t");e.appendChild(a,n);var n=e.createElement("td");e.setAttribute(n,"class","calories");var r=e.createComment("");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\t\t\t\t\t");e.appendChild(a,n);var n=e.createElement("td");e.setAttribute(n,"class","add-button");var r=e.createTextNode("\n");e.appendChild(n,r);var r=e.createTextNode("\t\t\t\t\t\t");e.appendChild(n,r);var r=e.createElement("button");e.setAttribute(r,"type","button"),e.setAttribute(r,"class","btn btn-add red darken-4");var l=e.createTextNode("Remove");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t\t\t\t\t");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n\t\t\t\t");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=e.childAt(t,[1]),r=e.childAt(n,[5,2]),l=new Array(3);return l[0]=e.createMorphAt(e.childAt(n,[1]),0,0),l[1]=e.createMorphAt(e.childAt(n,[3]),0,0),l[2]=e.createElementMorph(r),l},statements:[["content","item.name",["loc",[null,[23,27],[23,40]]]],["content","item.calories",["loc",[null,[24,26],[24,43]]]],["element","action",["removeItem",["get","item",["loc",[null,[27,83],[27,87]]]],["get","index",["loc",[null,[27,88],[27,93]]]]],[],["loc",[null,[27,61],[27,95]]]]],
locals:["item","index"],templates:[]}}();return{meta:{fragmentReason:!1,revision:"Ember@2.6.2",loc:{source:null,start:{line:9,column:0},end:{line:36,column:0}},moduleName:"materialize-health/templates/todays-food.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","row");var n=e.createTextNode("\n\t");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","col s10 offset-s1");var r=e.createTextNode("\n\t\t");e.appendChild(n,r);var r=e.createElement("table");e.setAttribute(r,"class","table table-striped"),e.setAttribute(r,"id","todays-table");var l=e.createTextNode("\n\t\t\t");e.appendChild(r,l);var l=e.createElement("thead"),d=e.createTextNode("\n\t\t\t\t");e.appendChild(l,d);var d=e.createElement("th"),i=e.createTextNode("Name");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode("\n\t\t\t\t");e.appendChild(l,d);var d=e.createElement("th"),i=e.createTextNode("Calories (1 serving)");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode("\n\t\t\t\t");e.appendChild(l,d);var d=e.createElement("th"),i=e.createTextNode("Remove from Today's Totals");e.appendChild(d,i),e.appendChild(l,d);var d=e.createTextNode("\n\t\t\t");e.appendChild(l,d),e.appendChild(r,l);var l=e.createTextNode("\n\n\t\t\t");e.appendChild(r,l);var l=e.createElement("tbody"),d=e.createTextNode("\n");e.appendChild(l,d);var d=e.createComment("");e.appendChild(l,d);var d=e.createTextNode("\t\t\t");e.appendChild(l,d),e.appendChild(r,l);var l=e.createTextNode("\n\t\t");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n\n");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=new Array(1);return n[0]=e.createMorphAt(e.childAt(t,[0,1,1,3]),1,1),n},statements:[["block","each",[["get","model.items",["loc",[null,[21,11],[21,22]]]]],[],0,null,["loc",[null,[21,3],[30,12]]]]],locals:[],templates:[e]}}(),t=function(){return{meta:{fragmentReason:!1,revision:"Ember@2.6.2",loc:{source:null,start:{line:36,column:0},end:{line:43,column:0}},moduleName:"materialize-health/templates/todays-food.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","row");var n=e.createTextNode("\n\t");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","col s12 center-align");var r=e.createTextNode("\n\t\t");e.appendChild(n,r);var r=e.createElement("p");e.setAttribute(r,"class","lead");var l=e.createTextNode("You haven't eaten anything today!");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t\t");e.appendChild(n,r);var r=e.createElement("p"),l=e.createTextNode("Search for a food and add it to today's totals to see it reflected here.");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");return e.appendChild(t,a),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}();return{meta:{fragmentReason:{name:"missing-wrapper",problems:["multiple-nodes","wrong-type"]},revision:"Ember@2.6.2",loc:{source:null,start:{line:1,column:0},end:{line:45,column:10}},moduleName:"materialize-health/templates/todays-food.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),a=e.createElement("div");e.setAttribute(a,"class","row");var n=e.createTextNode("\n\t");e.appendChild(a,n);var n=e.createElement("div");e.setAttribute(n,"class","col s8 offset-s2 col m4 offset-m4");var r=e.createTextNode("\n");e.appendChild(n,r);var r=e.createTextNode("\t\t");e.appendChild(n,r);var r=e.createElement("button");e.setAttribute(r,"class","btn btn-block btn-lg btn-warning red darken-4");var l=e.createTextNode("Hide");e.appendChild(r,l),e.appendChild(n,r);var r=e.createTextNode("\n\t");e.appendChild(n,r),e.appendChild(a,n);var n=e.createTextNode("\n");e.appendChild(a,n),e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createComment("");e.appendChild(t,a);var a=e.createTextNode("\n");e.appendChild(t,a);var a=e.createComment("");return e.appendChild(t,a),t},buildRenderNodes:function(e,t,a){var n=e.childAt(t,[0,1,2]),r=new Array(3);return r[0]=e.createElementMorph(n),r[1]=e.createMorphAt(t,2,2,a),r[2]=e.createMorphAt(t,4,4,a),e.insertBoundary(t,null),r},statements:[["element","action",["hideResults"],[],["loc",[null,[6,64],[6,88]]]],["block","if",[["get","model.foodAdded.status",["loc",[null,[9,6],[9,28]]]]],[],0,1,["loc",[null,[9,0],[43,7]]]],["content","outlet",["loc",[null,[45,0],[45,10]]]]],locals:[],templates:[e,t]}}())}),define("materialize-health/torii-providers/firebase",["exports","emberfire/torii-providers/firebase"],function(e,t){e.default=t.default}),define("materialize-health/config/environment",["ember"],function(e){var t="materialize-health";try{var a=t+"/config/environment",n=e.default.$('meta[name="'+a+'"]').attr("content"),r=JSON.parse(unescape(n));return{default:r}}catch(e){throw new Error('Could not read config from meta tag with name "'+a+'".')}}),runningTests||require("materialize-health/app").default.create({name:"materialize-health",version:"0.0.0+2f40d44f"});