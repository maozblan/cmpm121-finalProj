class_name Plant

var _StageIndex: int;
var _Pos: Vector2i;
var _Map: Map;

var currentTile: Vector2i;
var _Stages: Array[Vector2i];

func grow()->void:
	pass

#set a plants growth stage
func _SetStage(StageIndex: int)->bool:
	if StageIndex in range(0, _Stages.size()):
		_StageIndex = StageIndex;
		currentTile = _Stages[StageIndex];
		return true;
	return false;
	
func _init():
	assert(false, "don't create a Plant object, create an object of one of it's subclasses such as flower");
