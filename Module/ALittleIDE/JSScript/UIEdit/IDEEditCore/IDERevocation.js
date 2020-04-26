{
if (typeof ALittleIDE === "undefined") ALittleIDE = {};
let ___all_struct = ALittle.GetAllStruct();

ALittle.RegStruct(-1479093282, "ALittle.UIEvent", {
name : "ALittle.UIEvent", ns_name : "ALittle", rl_name : "UIEvent", hash_code : -1479093282,
name_list : ["target"],
type_list : ["ALittle.DisplayObject"],
option_map : {}
})
ALittle.RegStruct(-431205740, "ALittle.UIResizeEvent", {
name : "ALittle.UIResizeEvent", ns_name : "ALittle", rl_name : "UIResizeEvent", hash_code : -431205740,
name_list : ["target"],
type_list : ["ALittle.DisplayObject"],
option_map : {}
})

ALittleIDE.IDERevokeObject = JavaScript.Class(undefined, {
	Forward : function() {
	},
	Back : function() {
	},
}, "ALittleIDE.IDERevokeObject");

ALittleIDE.IDERevokeList = JavaScript.Class(undefined, {
	Ctor : function() {
		this._revoke_list = [];
		this._revoke_count = 0;
		this._revoke_index = 0;
		this._max_count = 100;
	},
	PushRevoke : function(revoke) {
		if (this._revoke_index < this._revoke_count) {
			for (let i = this._revoke_index + 1; i <= this._revoke_count; i += 1) {
				this._revoke_list[i - 1] = undefined;
			}
			this._revoke_count = this._revoke_index;
		}
		this._revoke_index = this._revoke_index + 1;
		this._revoke_count = this._revoke_count + 1;
		this._revoke_list[this._revoke_index - 1] = revoke;
		if (this._revoke_count > this._max_count) {
			this._revoke_index = this._revoke_index - 1;
			this._revoke_count = this._revoke_count - 1;
			ALittle.List_Remove(this._revoke_list, 1);
		}
	},
	DoRevoke : function() {
		if (this._revoke_index >= this._revoke_count) {
			return;
		}
		this._revoke_index = this._revoke_index + 1;
		let revoke = this._revoke_list[this._revoke_index - 1];
		revoke.Forward();
	},
	UndoRevoke : function() {
		if (this._revoke_index === 0) {
			return;
		}
		let revoke = this._revoke_list[this._revoke_index - 1];
		revoke.Back();
		this._revoke_index = this._revoke_index - 1;
	},
}, "ALittleIDE.IDERevokeList");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDERevokeBind = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function() {
		this._list = [];
		this._count = 0;
	},
	PushRevoke : function(revoke) {
		++ this._count;
		this._list[this._count - 1] = revoke;
	},
	Forward : function() {
		let ___OBJECT_1 = this._list;
		for (let k = 1; k <= ___OBJECT_1.length; ++k) {
			let revoke = ___OBJECT_1[k - 1];
			if (revoke === undefined) break;
			revoke.Forward();
		}
	},
	Back : function() {
		for (let i = this._count; i >= 1; i += -1) {
			this._list[i - 1].Back();
		}
	},
}, "ALittleIDE.IDERevokeBind");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDETextEditRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(target, old_text, new_text) {
		this._target = target;
		this._old_text = old_text;
		this._new_text = new_text;
	},
	Forward : function() {
		this._target.text = this._new_text;
	},
	Back : function() {
		this._target.text = this._old_text;
	},
}, "ALittleIDE.IDETextEditRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDEDeleteRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(parent, current, index) {
		this._parent = parent;
		this._current = current;
		this._index = index;
	},
	Forward : function() {
		let current = this._current;
		let parent = this._parent;
		let child_type = current.user_info.child_type;
		if (child_type === undefined) {
			return;
		}
		parent.RemoveChild(current);
		if (child_type === "child") {
			parent.user_info.object.RemoveChild(current.user_info.object);
		} else if (child_type !== undefined) {
			delete parent.user_info.object[child_type];
		}
		current.RemoveAttributePanel();
		current.tab_child.UpdateHandleQuadRemove(current);
		parent.tab_child.UpdateHandleQuadLayout(parent);
		current.tab_child.Save(false);
	},
	Back : function() {
		let current = this._current;
		let parent = this._parent;
		let index = this._index;
		let child_type = current.user_info.child_type;
		if (child_type === undefined) {
			return;
		}
		parent.AddChild(current, index);
		if (child_type === "child") {
			parent.user_info.object.AddChild(current.user_info.object, index);
		} else if (child_type !== undefined) {
			parent.user_info.object[child_type] = current.user_info.object;
		}
		parent.tab_child.UpdateHandleQuadLayout(parent);
		current.tab_child.Save(false);
	},
}, "ALittleIDE.IDEDeleteRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDEChildShowRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(parent, current, index) {
		this._parent = parent;
		this._current = current;
		this._index = index;
	},
	Forward : function() {
		let current = this._current;
		let parent = this._parent;
		let index = this._index;
		let child_type = current.user_info.child_type;
		if (child_type === undefined) {
			return;
		}
		parent.AddChild(current, index);
		if (child_type === "child") {
			parent.user_info.object.AddChild(current.user_info.object, index);
		} else if (child_type !== undefined) {
			parent.user_info.object[child_type] = current.user_info.object;
		}
		parent.tab_child.UpdateHandleQuadLayout(parent);
		current.tab_child.Save(false);
	},
	Back : function() {
		let current = this._current;
		let parent = this._parent;
		let child_type = current.user_info.child_type;
		if (child_type === undefined) {
			return;
		}
		parent.RemoveChild(current);
		if (child_type === "child") {
			parent.user_info.object.RemoveChild(current.user_info.object);
		} else if (child_type !== undefined) {
			delete parent.user_info.object[child_type];
		}
		current.RemoveAttributePanel();
		current.tab_child.UpdateHandleQuadRemove(current);
		parent.tab_child.UpdateHandleQuadLayout(parent);
		current.tab_child.Save(false);
	},
}, "ALittleIDE.IDEChildShowRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDEDragXYRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(target, delta_x, delta_y) {
		this._target = target;
		this._delta_x = delta_x;
		this._delta_y = delta_y;
	},
	Foward : function() {
		this._target.DragXY(this._delta_x, this._delta_y);
		this._target.tab_child.UpdateHandleQuadLayout(this._target);
		this._target.tab_child.Save(false);
	},
	Back : function() {
		this._target.DragXY(-this._delta_x, -this._delta_y);
		this._target.tab_child.UpdateHandleQuadLayout(this._target);
		this._target.tab_child.Save(false);
	},
}, "ALittleIDE.IDEDragXYRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDEDragWHRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(target, delta_x, delta_y) {
		this._target = target;
		this._delta_x = delta_x;
		this._delta_y = delta_y;
	},
	Foward : function() {
		this._target.DragWH(this._delta_x, this._delta_y);
		this._target.tab_child.UpdateHandleQuadLayout(this._target);
		this._target.tab_child.Save(false);
	},
	Back : function() {
		this._target.DragWH(-this._delta_x, -this._delta_y);
		this._target.tab_child.UpdateHandleQuadLayout(this._target);
		this._target.tab_child.Save(false);
	},
}, "ALittleIDE.IDEDragWHRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDEChildUpDownRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(parent, current, up_down) {
		this._parent = parent;
		this._current = current;
		this._up_down = up_down;
	},
	Forward : function() {
		let parent = this._parent;
		let current = this._current;
		let text = this._up_down;
		let index = parent.GetChildIndex(current);
		if (text === "up") {
			index = index - 1;
		} else if (text === "down") {
			index = index + 1;
		}
		parent.SetChildIndex(current, index);
		parent.user_info.object.SetChildIndex(current.user_info.object, index);
	},
	Back : function() {
		let parent = this._parent;
		let current = this._current;
		let text = this._up_down;
		let index = parent.GetChildIndex(current);
		if (text === "up") {
			index = index + 1;
		} else if (text === "down") {
			index = index - 1;
		}
		parent.SetChildIndex(current, index);
		parent.user_info.object.SetChildIndex(current.user_info.object, index);
	},
}, "ALittleIDE.IDEChildUpDownRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDENatureChangeRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(target, nature, old_base, new_base, old_object, new_object, text, need_reset) {
		this._target = target;
		this._nature = nature;
		this._old_base = old_base;
		this._new_base = new_base;
		this._old_object = old_object;
		this._new_object = new_object;
		this._need_reset = need_reset;
		this._text = text;
	},
	Forward : function() {
		let user_info = this._target.user_info;
		let nature = this._nature;
		user_info.base[nature] = this._new_base;
		user_info.object[nature] = this._new_object;
		if (this._target.attr_panel !== undefined && this._text !== undefined) {
			this._target.attr_panel["_" + nature].text = this._text;
		}
		if (this._need_reset) {
			this._target.tab_child.UpdateHandleQuadLayout(this._target);
		}
		this._target.tab_child.Save(false);
	},
	Back : function() {
		let user_info = this._target.user_info;
		let nature = this._nature;
		user_info.base[nature] = this._old_base;
		user_info.object[nature] = this._old_object;
		if (this._target.attr_panel !== undefined) {
			this._target.attr_panel.LoadNatureBase();
		}
		if (this._need_reset) {
			this._target.tab_child.UpdateHandleQuadLayout(this._target);
		}
		this._target.tab_child.Save(false);
	},
}, "ALittleIDE.IDENatureChangeRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDECreateAntiRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(target, name, info, item) {
		this._target = target;
		this._name = name;
		this._info = info;
		this._item = item;
	},
	Forward : function() {
		let user_info = this._target.tab_child.tree_object.user_info;
		if (user_info.base.loop_map === undefined) {
			user_info.base.loop_map = {};
		}
		user_info.base.loop_map[this._name] = this._info;
		this._target.anti_scroll_list.AddChild(this._item);
		this._target.tab_child.Save(false);
	},
	Back : function() {
		let user_info = this._target.tab_child.tree_object.user_info;
		if (user_info.base.loop_map === undefined) {
			return;
		}
		delete user_info.base.loop_map[this._name];
		this._target.anti_scroll_list.RemoveChild(this._item);
		this._target.tab_child.Save(false);
	},
}, "ALittleIDE.IDECreateAntiRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDEDeleteAntiRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(target, name, info, item, child_index) {
		this._target = target;
		this._name = name;
		this._info = info;
		this._item = item;
		this._child_index = child_index;
	},
	Forward : function() {
		let user_info = this._target.tab_child.tree_object.user_info;
		if (user_info.base.loop_map === undefined) {
			return;
		}
		delete user_info.base.loop_map[this._name];
		this._target.anti_scroll_list.RemoveChild(this._item);
		this._target.tab_child.Save(false);
	},
	Back : function() {
		let user_info = this._target.tab_child.tree_object.user_info;
		if (user_info.base.loop_map === undefined) {
			user_info.base.loop_map = {};
		}
		user_info.base.loop_map[this._name] = this._info;
		this._target.anti_scroll_list.AddChild(this._item, this._child_index);
		this._target.tab_child.Save(false);
	},
}, "ALittleIDE.IDEDeleteAntiRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDEAntiAddAttrRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(target, name, info, anti_item, link_item) {
		this._target = target;
		this._name = name;
		this._info = info;
		this._anti_item = anti_item;
		this._link_item = link_item;
	},
	Forward : function() {
		let user_info = this._target.tab_child.tree_object.user_info;
		if (user_info.base.loop_map === undefined) {
			return;
		}
		let info = user_info.base.loop_map[this._name];
		if (info === undefined) {
			return;
		}
		ALittle.List_Push(info.childs, this._info);
		if (this._target.cur_show === this._name) {
			this._target.anti_anti_linear.AddChild(this._anti_item);
			this._target.anti_link_linear.AddChild(this._link_item);
			let static_object_v = this._target.anti_screen.static_object_v;
			static_object_v.height = this._target.anti_link_linear.y + this._target.anti_link_linear.height;
			this._target.anti_screen.RejustScrollBar();
		}
		this._target.tab_child.Save(false);
	},
	Back : function() {
		let user_info = this._target.tab_child.tree_object.user_info;
		if (user_info.base.loop_map === undefined) {
			return;
		}
		let info = user_info.base.loop_map[this._name];
		if (info === undefined) {
			return;
		}
		ALittle.List_Remove(info.childs, ALittle.List_MaxN(info.childs));
		if (this._target.cur_show === this._name) {
			this._target.anti_anti_linear.RemoveChild(this._anti_item);
			this._target.anti_link_linear.RemoveChild(this._link_item);
			let static_object_v = this._target.anti_screen.static_object_v;
			static_object_v.height = this._target.anti_link_linear.y + this._target.anti_link_linear.height;
			this._target.anti_screen.RejustScrollBar();
		}
		this._target.tab_child.Save(false);
	},
}, "ALittleIDE.IDEAntiAddAttrRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDEAntiRemoveAttrRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(target, name, info, anti_item, link_item, child_index) {
		this._target = target;
		this._name = name;
		this._info = info;
		this._anti_item = anti_item;
		this._link_item = link_item;
		this._child_index = child_index;
	},
	Forward : function() {
		let user_info = this._target.tab_child.tree_object.user_info;
		if (user_info.base.loop_map === undefined) {
			return;
		}
		let info = user_info.base.loop_map[this._name];
		if (info === undefined) {
			return;
		}
		ALittle.List_Remove(info.childs, this._child_index);
		if (this._target.cur_show === this._name) {
			this._target.anti_anti_linear.RemoveChild(this._anti_item);
			this._target.anti_link_linear.RemoveChild(this._link_item);
			let static_object_v = this._target.anti_screen.static_object_v;
			static_object_v.height = this._target.anti_link_linear.y + this._target.anti_link_linear.height;
			this._target.anti_screen.RejustScrollBar();
		}
		this._target.tab_child.Save(false);
	},
	Back : function() {
		let user_info = this._target.tab_child.tree_object.user_info;
		if (user_info.base.loop_map === undefined) {
			return;
		}
		let info = user_info.base.loop_map[this._name];
		if (info === undefined) {
			return;
		}
		ALittle.List_Insert(info.childs, this._child_index, this._info);
		if (this._target.cur_show === this._name) {
			this._target.anti_anti_linear.AddChild(this._anti_item, this._child_index);
			this._target.anti_link_linear.AddChild(this._link_item, this._child_index);
			let static_object_v = this._target.anti_screen.static_object_v;
			static_object_v.height = this._target.anti_link_linear.y + this._target.anti_link_linear.height;
			this._target.anti_screen.RejustScrollBar();
		}
		this._target.tab_child.Save(false);
	},
}, "ALittleIDE.IDEAntiRemoveAttrRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDEAntiInsertLoopRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(target, info, loop_item, child_index) {
		this._target = target;
		this._info = info;
		this._loop_item = loop_item;
		this._child_index = child_index;
	},
	Forward : function() {
		ALittle.List_Insert(this._target.info.childs, this._child_index, this._info);
		this._target.container.AddChild(this._loop_item, this._child_index);
		this._target.panel.tab_child.Save(false);
	},
	Back : function() {
		ALittle.List_Remove(this._target.info.childs, this._child_index);
		this._target.container.RemoveChild(this._loop_item);
		if (this._target.panel.cur_loop_item === this._loop_item) {
			this._target.panel.HideAntiLoop();
		}
		this._target.panel.tab_child.Save(false);
	},
}, "ALittleIDE.IDEAntiInsertLoopRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDEAntiDeleteLoopRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(target, info, loop_item, child_index) {
		this._target = target;
		this._info = info;
		this._loop_item = loop_item;
		this._child_index = child_index;
	},
	Forward : function() {
		ALittle.List_Remove(this._target.info.childs, this._child_index);
		this._target.container.RemoveChild(this._loop_item);
		if (this._target.panel.cur_loop_item === this._loop_item) {
			this._target.panel.HideAntiLoop();
		}
		this._target.panel.tab_child.Save(false);
	},
	Back : function() {
		ALittle.List_Insert(this._target.info.childs, this._child_index, this._info);
		this._target.container.AddChild(this._loop_item, this._child_index);
		this._target.panel.tab_child.Save(false);
	},
}, "ALittleIDE.IDEAntiDeleteLoopRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDEAntiClearLoopRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(target, info_list, loop_item_list) {
		this._target = target;
		this._info_list = info_list;
		this._loop_item_list = loop_item_list;
	},
	Forward : function() {
		this._target.info.childs = [];
		this._target.container.RemoveAllChild();
		this._target.panel.HideAntiLoop();
		this._target.panel.tab_child.Save(false);
	},
	Back : function() {
		this._target.info.childs = this._info_list;
		let ___OBJECT_2 = this._loop_item_list;
		for (let index = 1; index <= ___OBJECT_2.length; ++index) {
			let child = ___OBJECT_2[index - 1];
			if (child === undefined) break;
			this._target.container.AddChild(child);
		}
		this._target.panel.tab_child.Save(false);
	},
}, "ALittleIDE.IDEAntiClearLoopRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDEAntiLoopTargetValueChangeRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(target, old_value, new_value) {
		this._target = target;
		this._old_value = old_value;
		this._new_value = new_value;
	},
	Forward : function() {
		this._target.info.target = ALittleIDE.IDEAntiFrameLoopItem.StringToValue(this._target.item.info.attribute, this._new_value);
		this._target.UpdateText();
		if (this._target.item.panel.cur_loop_item === this._target) {
			if (this._target.info.clazz === "LoopLinear") {
				this._target.item.panel.linear_target_value.text = ALittleIDE.IDEAntiFrameLoopItem.ValueToString(this._target.info.target);
			} else if (this._target.info.clazz === "LoopAttribute") {
				this._target.item.panel.attribute_target_value.text = ALittleIDE.IDEAntiFrameLoopItem.ValueToString(this._target.info.target);
			} else if (this._target.info.clazz === "LoopRit") {
				this._target.item.panel.rit_target_value.text = ALittleIDE.IDEAntiFrameLoopItem.ValueToString(this._target.info.target);
			}
		}
		this._target.item.panel.tab_child.Save(false);
	},
	Back : function() {
		this._target.info.target = ALittleIDE.IDEAntiFrameLoopItem.StringToValue(this._target.item.info.attribute, this._old_value);
		this._target.UpdateText();
		if (this._target.item.panel.cur_loop_item === this._target) {
			if (this._target.info.clazz === "LoopLinear") {
				this._target.item.panel.linear_target_value.text = ALittleIDE.IDEAntiFrameLoopItem.ValueToString(this._target.info.target);
			} else if (this._target.info.clazz === "LoopAttribute") {
				this._target.item.panel.attribute_target_value.text = ALittleIDE.IDEAntiFrameLoopItem.ValueToString(this._target.info.target);
			} else if (this._target.info.clazz === "LoopRit") {
				this._target.item.panel.rit_target_value.text = ALittleIDE.IDEAntiFrameLoopItem.ValueToString(this._target.info.target);
			}
		}
		this._target.item.panel.tab_child.Save(false);
	},
}, "ALittleIDE.IDEAntiLoopTargetValueChangeRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDEAntiLoopTotalTimeChangeRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(target, old_value, new_value) {
		this._target = target;
		this._old_value = old_value;
		this._new_value = new_value;
	},
	Forward : function() {
		this._target.info.total_time = this._new_value;
		this._target.UpdateText();
		if (this._target.item.panel.cur_loop_item === this._target) {
			if (this._target.info.clazz === "LoopLinear") {
				this._target.item.panel.linear_total_time.text = this._target.info.total_time;
			} else if (this._target.info.clazz === "LoopRit") {
				this._target.item.panel.rit_total_time.text = this._target.info.total_time;
			}
		}
		this._target.UpdateShow();
		this._target.DispatchEvent(___all_struct.get(-431205740), {});
		this._target.item.panel.tab_child.Save(false);
	},
	Back : function() {
		this._target.info.total_time = this._old_value;
		this._target.UpdateText();
		if (this._target.item.panel.cur_loop_item === this._target) {
			if (this._target.info.clazz === "LoopLinear") {
				this._target.item.panel.linear_total_time.text = this._target.info.total_time;
			} else if (this._target.info.clazz === "LoopRit") {
				this._target.item.panel.rit_total_time.text = this._target.info.total_time;
			}
		}
		this._target.UpdateShow();
		this._target.DispatchEvent(___all_struct.get(-431205740), {});
		this._target.item.panel.tab_child.Save(false);
	},
}, "ALittleIDE.IDEAntiLoopTotalTimeChangeRevoke");

if (ALittleIDE.IDERevokeObject === undefined) throw new Error(" extends class:ALittleIDE.IDERevokeObject is undefined");
ALittleIDE.IDEAntiLoopDelayTimeChangeRevoke = JavaScript.Class(ALittleIDE.IDERevokeObject, {
	Ctor : function(target, old_value, new_value) {
		this._target = target;
		this._old_value = old_value;
		this._new_value = new_value;
	},
	Forward : function() {
		this._target.info.delay_time = this._new_value;
		this._target.UpdateText();
		if (this._target.item.panel.cur_loop_item === this._target) {
			if (this._target.info.clazz === "LoopLinear") {
				this._target.item.panel.linear_delay_time.text = this._target.info.delay_time;
			} else if (this._target.info.clazz === "LoopAttribute") {
				this._target.item.panel.attribute_delay_time.text = this._target.info.delay_time;
			} else if (this._target.info.clazz === "LoopRit") {
				this._target.item.panel.rit_delay_time.text = this._target.info.delay_time;
			}
		}
		this._target.UpdateShow();
		this._target.DispatchEvent(___all_struct.get(-431205740), {});
		this._target.item.panel.tab_child.Save(false);
	},
	Back : function() {
		this._target.info.delay_time = this._old_value;
		this._target.UpdateText();
		if (this._target.item.panel.cur_loop_item === this._target) {
			if (this._target.info.clazz === "LoopLinear") {
				this._target.item.panel.linear_delay_time.text = this._target.info.delay_time;
			} else if (this._target.info.clazz === "LoopAttribute") {
				this._target.item.panel.attribute_delay_time.text = this._target.info.delay_time;
			} else if (this._target.info.clazz === "LoopRit") {
				this._target.item.panel.rit_delay_time.text = this._target.info.delay_time;
			}
		}
		this._target.UpdateShow();
		this._target.DispatchEvent(___all_struct.get(-431205740), {});
		this._target.item.panel.tab_child.Save(false);
	},
}, "ALittleIDE.IDEAntiLoopDelayTimeChangeRevoke");

}