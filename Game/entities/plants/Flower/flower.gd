extends Plant
class_name Flower

func Grow(sun: float, water: float)->void:
	pass

static func createPlant(Pos: Vector2i, StageIndex: int)->Plant:
	var out = Plant.new();
	out._Pos = Pos;
	out._StageIndex = StageIndex;
	if not out.SetStage(StageIndex):
		out.hide();
		out.queue_free();
		return null;
	return out;
