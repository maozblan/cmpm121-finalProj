extends Node2D
class_name Plant

@export var scene: Node2D;
@export var stages: Array[Sprite2D];
var _StageIndex: int;
var _Pos: Vector2i;

func Grow(sun: float, water: float)->void:
	pass

#set a plants growth stage
func SetStage(StageIndex: int)->bool:
	if StageIndex not in range(0, stages.size()):
		return false;
	_StageIndex = StageIndex;
	for i in range(0, stages.size()):
		if i == StageIndex:
			stages[i].show();
		else:
			stages[i].hide();
	return true;

#create a new plant: call this function on the subclass you want, not Plant
static func createPlant(Pos: Vector2i, StageIndex: int)->Plant:
	assert(false, "call createPlant on a subclass of plant, not the base class");
	return null;
