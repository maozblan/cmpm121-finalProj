extends Plant
class_name Flower

func grow()->void:
	var tmp_sun = _map.get_cell_sunlight(pos);
	var tmp_water = _map.get_cell_water(pos);
	
	var nearby_wheat_count = 0;
	for i in range(-1, 2, 2):
		for j in range(-1, 2, 2):
			var tmp:Plant = _map.get_cell_plant(pos + Vector2i(i, j));
			if tmp is Wheat:
				nearby_wheat_count += 1;
	
	if (tmp_sun >= 3 and tmp_water >= 3) and (tmp_sun >= 7 or tmp_water >= 7) and nearby_wheat_count < 2 and _stage_index + 1 <= 2:
		_SetStage(_stage_index + 1);
	elif tmp_sun == 0 or tmp_water == 0:
		_SetStage(0);

func _init(pos: Vector2i, map_instance: Map):
	_stages = [Vector2i(8, 0), Vector2i(0, 1), Vector2i(1, 1)];
	pos = pos;
	_stage_index = 0;
	_map = map_instance;
	_SetStage(0);
