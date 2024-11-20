extends Plant
class_name Flower

func grow()->void:
	#if sun > value and water > value
	#	Reduce water by value
	#	Move to next stage
	#else if sun < value2 or water < value2
	#	if !Wither
	#		Wither
	#	else
	#		Die
	pass

static func create_plant(Pos: Vector2i, StageIndex: int)->Plant:
	var out = Plant.new();
	out._Pos = Pos;
	out._StageIndex = StageIndex;
	if not out.SetStage(StageIndex):
		out.hide();
		out.queue_free();
		return null;
	return out;
