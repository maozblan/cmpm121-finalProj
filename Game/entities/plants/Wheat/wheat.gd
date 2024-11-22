extends Plant
class_name Wheat

func grow()->void:
	var tmp_sun = _map.get_cell_sunlight(pos);
	var tmp_water = _map.get_cell_water(pos);
	var nearby_wheat_count = 0;
	for i in range(-1, 2, 2):
		for j in range(-1, 2, 2):
			var tmp:Plant = _map.get_cell_plant(pos + Vector2i(i, j));
			if tmp is Wheat:
				nearby_wheat_count += 1;
		
	if ((tmp_sun > 3 and tmp_water > 3) or (tmp_sun > 2 and tmp_water > 2 and nearby_wheat_count >= 2) or (tmp_sun > 1 and tmp_water > 1 and nearby_wheat_count >= 4)) and _stage_index + 1 <= 2:
		_SetStage(_stage_index + 1);
	elif ((tmp_sun < 2 and tmp_water < 2 and nearby_wheat_count == 0) or (tmp_sun < 1 and tmp_water < 1 and nearby_wheat_count >= 2) or (tmp_sun < 0 and tmp_water < 0 and nearby_wheat_count >= 4)):
		_SetStage(0);

func _init(pos: Vector2i, map_instance: Map):
	_stages = [Vector2i(10, 12), Vector2i(10, 13), Vector2i(10, 14)];
	self.pos = pos;
	_stage_index = 0;
	_map = map_instance;
	_SetStage(0);
