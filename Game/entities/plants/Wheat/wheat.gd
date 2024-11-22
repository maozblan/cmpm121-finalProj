extends Plant
class_name Wheat

var GrowthValue = 0

func grow()->void:
	var tmp_sun = _map.get_cell_sunlight(pos);
	var tmp_water = _map.get_cell_water(pos);
	var nearby_wheat_count = 0;
	for i in range(-1, 2, 2):
		for j in range(-1, 2, 2):
			var tmp:Plant = _map.get_cell_plant(pos + Vector2i(i, j));
			if tmp is Wheat:
				nearby_wheat_count += 1;
	if tmp_sun >= 3 and tmp_water >= 3:
		if nearby_wheat_count >= 4:
			GrowthValue += 2;
		elif nearby_wheat_count >= 2:
			if tmp_sun >= 7 or tmp_water >= 7:
				GrowthValue += 2;
			else:
				GrowthValue += 1;
		else:
			if tmp_sun >= 10 or tmp_water >= 10:
				GrowthValue += 2;
			elif tmp_sun >= 7 or tmp_water >= 7:
				GrowthValue += 1;
	elif tmp_sun >= 3 or tmp_water >= 3:
		GrowthValue -= 2;
	else:
		GrowthValue -= 4;
	GrowthValue = max(min(GrowthValue, 12), 0)
	_SetStage(max(min(floor(GrowthValue / 4), 2), 0));

func _init(pos: Vector2i, map_instance: Map):
	_stages = [Vector2i(10, 12), Vector2i(10, 13), Vector2i(10, 14)];
	self.pos = pos;
	_stage_index = 0;
	_map = map_instance;
	_SetStage(0);
