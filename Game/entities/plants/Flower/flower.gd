extends Plant
class_name Flower

func grow()->void:
	var tmp_sun = _Map.get_cell_sunlight(_Pos);
	var tmp_water = _Map.get_cell_water(_Pos);
	if tmp_sun > 3 and tmp_water > 3 and _StageIndex + 1 <= 2:
		_SetStage(_StageIndex + 1);
	elif tmp_sun < 1 or tmp_water < 1:
		_SetStage(0);

func _init(Pos: Vector2i, MapInstance: Map):
	_Stages = [Vector2i(8, 0), Vector2i(0, 1), Vector2i(1, 1)];
	_Pos = Pos;
	_StageIndex = 0;
	_Map = MapInstance;
	_SetStage(0);
