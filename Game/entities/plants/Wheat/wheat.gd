extends Plant
class_name Wheat

func grow()->void:
	var tmp_sun = _map.get_cell_sunlight(pos);
	var tmp_water = _map.get_cell_water(pos);
	if tmp_sun > 3 and tmp_water > 3 and _stage_index + 1 <= 2:
		_SetStage(_stage_index + 1);
	elif tmp_sun < 1 or tmp_water < 1:
		_SetStage(0);

func _init(Pos: Vector2i, map_instance: Map):
	_stages = [Vector2i(10, 12), Vector2i(10, 13), Vector2i(10, 14)];
	pos = pos;
	_stage_index = 0;
	_map = map_instance;
	_SetStage(0);
