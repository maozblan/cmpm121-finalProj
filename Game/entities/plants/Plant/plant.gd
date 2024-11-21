#extends Node2D
class_name Plant

class tmp_cell_class:
	var sunlight: int;
	var water: int;
	var plant: Plant;

class tmp_map_class:
	func get_cell(cord:Vector2i)->tmp_cell_class:
		return tmp_cell_class.new(); 
	func place_plant(cord:Vector2i, plant:Plant):
		pass;

var _StageIndex: int;
var _Pos: Vector2i;
var _Map: tmp_map_class;

var currentTile: Vector2i;
var stages: Array[Vector2i];

func grow()->void:
	pass

#set a plants growth stage
func _SetStage(StageIndex: int)->bool:
	if StageIndex in range(0, stages.size()):
		_StageIndex = StageIndex;
		currentTile = stages[StageIndex];
		return true;
	return false;

#create a new plant: call this function on the subclass you want, not Plant
static func create_plant(Pos: Vector2i, Map: tmp_map_class, StageIndex: int)->Plant:
	assert(false, "call createPlant on a subclass of plant, not the base class");
	return null;
