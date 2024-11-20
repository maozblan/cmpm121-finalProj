extends Node
@onready var current_scene = $CurrentScene
var gameScene = preload("res://scenes/game/game.tscn")

# Called when the node enters the scene tree for the first time.
func _ready():
	current_scene.add_child(gameScene.instantiate());


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	pass
