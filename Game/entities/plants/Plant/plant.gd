extends Node2D
class_name Plant

enum PLANT_TYPE {
	FLOWER
}
class Point:
	var x: int = 0;
	var y: int = 0;

var type: PLANT_TYPE = PLANT_TYPE.FLOWER;
var pos: Point;


# Called when the node enters the scene tree for the first time.
#func _ready() -> void:
	#pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta: float) -> void:
	#pass


func update() ->void:
	pass
