extends Plant
class_name Flower

func grow()->void:
	var tmp_cell: tmp_cell_class = _Map.get_cell(Vector2i.ZERO);
	if tmp_cell.sun > 3 and tmp_cell.water > 3:
		_SetStage(_StageIndex + 1);
	elif tmp_cell.sun < 1 or tmp_cell.water < 1:
		pass
	#if sun > value and water > value
	#	Reduce water by value
	#	Move to next stage
	#else if sun < value2 or water < value2
	#	if !Wither
	#		Wither
	#	else
	#		Die
	pass

static func create_plant(Pos: Vector2i, Map: tmp_map_class, StageIndex: int)->Plant:
	var out = Plant.new();
	out._Pos = Pos;
	out._StageIndex = StageIndex;
	out._Map = Map;
	if not out.SetStage(StageIndex):
		out.hide();
		out.queue_free();
		return null;
	return out;
