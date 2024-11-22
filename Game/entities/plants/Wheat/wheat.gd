extends Plant
class_name Wheat

func grow()->void:
	var tmp_sun = _Map.get_cell_sunlight(_Pos);
	var tmp_water = _Map.get_cell_water(_Pos);
	if tmp_sun > 2 and tmp_water > 2 and _StageIndex + 1 <= 2:
		_SetStage(_StageIndex + 1);
	elif tmp_sun < 0 or tmp_water < 0:
		_SetStage(0);

func _init(Pos: Vector2i, MapInstance: Map):
	_Stages = [Vector2i(10, 12), Vector2i(10, 13), Vector2i(10, 14)];
	_Pos = Pos;
	_StageIndex = 0;
	_Map = MapInstance;
	_SetStage(0);
