
Subsystem = Class.extend({
	maxLevel:4,
	energyLevel:1,
	energyUsageByLevel:0.03
});



Shield = Subsystem.extend({ 
});

Subsystem= Class.extend({
	subsystems: {
		shield:new Shield(),
	}
});


