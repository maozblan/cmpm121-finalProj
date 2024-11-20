#extends Node2D
class_name Plant

var _StageIndex: int;
var _Pos: Vector2i;

func grow()->void:
	pass

#set a plants growth stage
func set_stage(StageIndex: int)->bool:#needs to be able to set tiles via map
	return false;

#create a new plant: call this function on the subclass you want, not Plant
static func create_plant(Pos: Vector2i, StageIndex: int)->Plant:
	assert(false, "call createPlant on a subclass of plant, not the base class");
	return null;
