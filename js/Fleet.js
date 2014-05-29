Fleet = Node.extend({
	energy:0,//TODO:move to subsystems class
	maxEnergy:100,//TODO:move to subsystems class
	reactorPower:.1, /*per fixeUpdate*/ //TODO:move to subsystems class
	ships:15000,
	owner:null, /*Player*/
	subSystems:{ //TODO:this should be a class
		/*the order in which systems appear here are their energy usage priority ?
		maybe this could be a player stance: 
		aggressive: Weapon, Engine, Shield //shield is the last because its agile aggressive
		defensive: Shield, Weapon, Engine  //player has more control over weapons, thats why its second
		speed: Engine, Weapon, Shield //same as above

		// no, weapons wont change lvl, they will just not fire.
		// also, maybe the first one could be engines, because the player also has some degree of controll over it
		//therefore we should remove this player stance thing, and define the priorities:
		//first engine goes automatticaly down, then shields. 
		This will be good when the ghost-priorities comes in practive
		*/

		maxLevel:4,
		energyLevel:{ /*up to 4*/
			shield:1,
			weapon:1,
			engine:1
		},
		energyUsageByLevel:{ /*up to 4*/
			shield:.03, //0.03 is good, because power regenerates on lvl 3, but very slowly
			weapon:20, //TODO:this is instant.. 
			engine:.03 //TODO:this is only used when moving.. 
		},
	},
	chargeCapacitor:function(){//TODO:move to subsystems class
		this.energy += this.reactorPower;
		if (this.energy > this.maxEnergy) this.energy = this.maxEnergy; //wasting energy
	},
	supplySubSystems:function(){//TODO:move to subsystems class
		for (var subSystem in this.subSystems.energyUsageByLevel){
			//this will provide the "best try" for the energy, decaying 1 lvl until zero, trying to suply the subsystem
			if (this.subSystems.energyLevel[subSystem] == 0) continue;
			while(this.nextEnergyLevel(subSystem) < 0){
				//TODO:save the user-defined level, so we can return to it once power is back
				//also we wont change the lvl of the weapon, we just wont fire 
				this.subSystems.energyLevel[subSystem] --;
				if (this.subSystems.energyLevel[subSystem] == 0) continue;
			}
			this.energy = this.nextEnergyLevel(subSystem);
		}
	},
	nextEnergyLevel:function(subSystem){//TODO:move to subsystems class
		return (this.energy - 
				this.subSystems.energyLevel			[subSystem]*
				this.subSystems.energyUsageByLevel	[subSystem])
	},

	setEnergyLevel:function(subSystem,lvl){//TODO:move to subsystems class
		if (this.subSystems.energyLevel[subSystem] == undefined) return;
		if (lvl < 0) lvl = 0;
		if (lvl > this.subSystems.maxLevel ) lvl = this.subSystems.maxLevel;
		this.subSystems.energyLevel[subSystem] = lvl;
	},
	getEnergyLevel:function(subSystem,lvl){//TODO:move to subsystems class
		if (this.subSystems.energyLevel[subSystem] == undefined) return 0 ;
		return this.subSystems.energyLevel[subSystem];
	},
	fixedUpdate:function(){
		//this._super();
		this.chargeCapacitor();
		this.supplySubSystems();
	},
	draw:function(arg){
		//this._super(); dont need to call super?
		console.log(this.energy);
		var barsHeight = 100;
		$("#capacitor div").css({height:(this.energy/this.maxEnergy)*barsHeight});
		for (var subSystem in this.subSystems.energyLevel){
			$("#" + subSystem+  " div")
				.css({height:(this.getEnergyLevel(subSystem)/this.subSystems.maxLevel)*barsHeight})
				.text(this.getEnergyLevel(subSystem));
			
		}
	},

})
