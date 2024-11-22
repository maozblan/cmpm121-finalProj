class_name Plant

var _stage_index: int;
var pos: Vector2i;
var _map: Map;

var current_tile: Vector2i;
var _stages: Array[Vector2i];

func grow()->void:
	pass

#set a plants growth stage
func _SetStage(stage_index: int)->bool:
	if stage_index in range(0, _stages.size()):
		_stage_index = stage_index;
		current_tile = _stages[stage_index];
		return true;
	return false;
	
func _init():
	assert(false, "don't create a Plant object, create an object of one of it's subclasses such as flower");
