{
if (typeof ALittleIDE === "undefined") window.ALittleIDE = {};
let ___all_struct = ALittle.GetAllStruct();

ALittle.RegStruct(-1807692147, "ALittleIDE.IDEControlFileSearchInfo", {
name : "ALittleIDE.IDEControlFileSearchInfo", ns_name : "ALittleIDE", rl_name : "IDEControlFileSearchInfo", hash_code : -1807692147,
name_list : ["list","count","index","name"],
type_list : ["List<ALittleIDE.IDEControlTreeLogic>","int","int","string"],
option_map : {}
})
ALittle.RegStruct(1715346212, "ALittle.Event", {
name : "ALittle.Event", ns_name : "ALittle", rl_name : "Event", hash_code : 1715346212,
name_list : ["target"],
type_list : ["ALittle.EventDispatcher"],
option_map : {}
})
ALittle.RegStruct(-427855371, "ALittleIDE.IDEControlModuleInfo", {
name : "ALittleIDE.IDEControlModuleInfo", ns_name : "ALittleIDE", rl_name : "IDEControlModuleInfo", hash_code : -427855371,
name_list : ["module_name","root_path"],
type_list : ["string","string"],
option_map : {}
})

if (ALittle.DisplayLayout === undefined) throw new Error(" extends class:ALittle.DisplayLayout is undefined");
ALittleIDE.IDEUIControlList = JavaScript.Class(ALittle.DisplayLayout, {
	Ctor : function(ctrl_sys) {
		this._group = new Map();
	},
	TCtor : function() {
		ALittleIDE.g_IDEProject.AddEventListener(___all_struct.get(-975432877), this, this.HandleProjectOpen);
		ALittleIDE.g_IDEProject.AddEventListener(___all_struct.get(-332308624), this, this.HandleProjectClose);
	},
	HandleProjectClose : function(event) {
		this._control_scroll_screen.RemoveAllChild();
	},
	HandleProjectOpen : function(event) {
		let module_map = ALittleIDE.g_IDEProject.project.config.GetConfig("control_module", {});
		delete module_map[event.name];
		let ui = ALittle.NewObject(ALittleIDE.IDEUIManager, event.name);
		ALittleIDE.g_IDEProject.project.ui[event.name] = ui;
		let info = {};
		info.ui = ui;
		info.module_name = event.name;
		info.name = "ui";
		info.path = ALittle.File_BaseFilePath() + "Module/" + event.name + "/UI";
		info.module_path = ALittle.File_BaseFilePath() + "Module/" + event.name + "/";
		info.group = this._group;
		info.root = true;
		this._control_scroll_screen.AddChild(ALittle.NewObject(ALittleIDE.IDEControlTree, ALittleIDE.g_Control, info));
		let ___OBJECT_1 = module_map;
		for (let index in ___OBJECT_1) {
			let module = ___OBJECT_1[index];
			if (module === undefined) continue;
			info = {};
			info.ui = ALittle.NewObject(ALittleIDE.IDEUIManager, module.module_name);
			info.module_name = module.module_name;
			info.name = ALittle.File_GetFileNameByPath(module.root_path);
			info.path = module.root_path;
			info.module_path = ALittle.File_GetFilePathByPath(module.root_path) + "/";
			info.group = this._group;
			info.root = true;
			ALittleIDE.g_IDEProject.project.ui[module.module_name] = info.ui;
			ui.control.RegisterPlugin(module.module_name, info.ui.control);
			let tree = ALittle.NewObject(ALittleIDE.IDEControlTree, ALittleIDE.g_Control, info);
			this._control_scroll_screen.AddChild(tree);
		}
	},
	GetControlTree : function(module) {
		let ___OBJECT_2 = this._control_scroll_screen.childs;
		for (let index = 1; index <= ___OBJECT_2.length; ++index) {
			let child = ___OBJECT_2[index - 1];
			if (child === undefined) break;
			if (child.user_info.module_name === module) {
				return child;
			}
		}
		return undefined;
	},
	get scroll_screen() {
		return this._control_scroll_screen;
	},
	AddModule : function(name) {
		let ui_manager = ALittleIDE.g_IDEProject.GetUIManager(undefined);
		if (ui_manager === undefined) {
			return;
		}
		let ___OBJECT_3 = this._control_scroll_screen.childs;
		for (let index = 1; index <= ___OBJECT_3.length; ++index) {
			let tree = ___OBJECT_3[index - 1];
			if (tree === undefined) break;
			if (tree.user_info.module_name === name) {
				return;
			}
		}
		let module_map = ALittleIDE.g_IDEProject.project.config.GetConfig("control_module", {});
		let module_info = {};
		module_info.module_name = name;
		module_info.root_path = ALittle.File_BaseFilePath() + "Module/" + name + "/UI";
		module_map[name] = module_info;
		ALittleIDE.g_IDEProject.project.config.SetConfig("control_module", module_map);
		let info = {};
		info.module_name = name;
		info.name = "ui";
		info.path = module_info.root_path;
		info.module_path = ALittle.File_BaseFilePath() + "Module/" + name + "/";
		info.group = this._group;
		info.root = true;
		info.ui = ALittle.NewObject(ALittleIDE.IDEUIManager, name);
		ALittleIDE.g_IDEProject.project.ui[name] = info.ui;
		ui_manager.control.RegisterPlugin(name, info.ui.control);
		let tree = ALittle.NewObject(ALittleIDE.IDEControlTree, ALittleIDE.g_Control, info);
		this._control_scroll_screen.AddChild(tree);
	},
	ShowTreeItemFocus : function(target) {
		target.ShowSelect();
		if (target !== this._control_scroll_screen) {
			let parent = target.logic_parent;
			while (parent !== undefined && parent !== this._control_scroll_screen) {
				parent.fold = true;
				parent = parent.logic_parent;
			}
		}
		this._control_scroll_screen.RejustScrollBar();
		let [x, y] = target.LocalToGlobal(this._control_scroll_screen.container);
		let target_x = (this._control_scroll_screen.view_width - target.width / 2) / 2 - x;
		let target_y = (this._control_scroll_screen.view_height - target.height) / 2 - y;
		if (this._tree_loop_x !== undefined) {
			this._tree_loop_x.Stop();
			this._tree_loop_x = undefined;
		}
		if (this._tree_loop_y !== undefined) {
			this._tree_loop_y.Stop();
			this._tree_loop_y = undefined;
		}
		this._tree_loop_x = ALittle.NewObject(ALittle.LoopLinear, this._control_scroll_screen, "container_x", target_x, 300, 0);
		this._tree_loop_x.Start();
		this._tree_loop_y = ALittle.NewObject(ALittle.LoopLinear, this._control_scroll_screen, "container_y", target_y, 300, 0);
		this._tree_loop_y.Start();
	},
	HandleControlSearchClick : function(event) {
		if (this._search_info === undefined || this._search_info.name !== this._control_search_key.text) {
			this._search_info = {};
			this._search_info.name = this._control_search_key.text;
			this._search_info.index = 0;
			this._search_info.list = [];
			let ___OBJECT_4 = this._control_scroll_screen.childs;
			for (let index = 1; index <= ___OBJECT_4.length; ++index) {
				let child = ___OBJECT_4[index - 1];
				if (child === undefined) break;
				child.SearchFile(this._search_info.name, this._search_info.list);
			}
			this._search_info.count = ALittle.List_MaxN(this._search_info.list);
		}
		if (this._search_info.count <= 0) {
			return;
		}
		this._search_info.index = this._search_info.index + (1);
		if (this._search_info.index > this._search_info.count) {
			this._search_info.index = 1;
		}
		let item = this._search_info.list[this._search_info.index - 1];
		this.ShowTreeItemFocus(item);
	},
	ShowNewControl : function(module_name) {
		if (ALittleIDE.g_IDEProject.project === undefined) {
			g_AUITool.ShowNotice("提示", "当前没有打开的项目");
			return;
		}
		if (module_name === undefined) {
			module_name = ALittleIDE.g_IDEProject.project.name;
		}
		if (this._control_new_dialog === undefined) {
			this._control_new_dialog = ALittleIDE.g_Control.CreateControl("ide_new_control_dialog", this);
			A_LayerManager.AddToModal(this._control_new_dialog);
			this._control_new_type.data_list = ALittleIDE.g_IDEEnum.child_type_list;
		}
		let data_list = [];
		let ___OBJECT_5 = ALittleIDE.g_IDEProject.project.ui;
		for (let name in ___OBJECT_5) {
			let ui = ___OBJECT_5[name];
			if (ui === undefined) continue;
			ALittle.List_Push(data_list, name);
		}
		this._control_new_module.data_list = data_list;
		this._control_new_module.text = module_name;
		this._control_new_name.text = "";
		this._control_new_dialog.visible = true;
		A_UISystem.focus = this._control_new_name.show_input;
	},
	HandleNewControlCancel : function(event) {
		this._control_new_dialog.visible = false;
	},
	HandleNewControlConfirm : function(event) {
		let project = ALittleIDE.g_IDEProject.project;
		if (project === undefined) {
			g_AUITool.ShowNotice("错误", "当前没有打开的项目");
			return;
		}
		let name = this._control_new_name.text;
		if (name === "") {
			g_AUITool.ShowNotice("错误", "请输入控件名");
			return;
		}
		if (ALittleIDE.IDEUtility_CheckName(name) !== undefined) {
			g_AUITool.ShowNotice("错误", "控件名不合法:" + name);
			return;
		}
		let ui_manager = project.ui[this._control_new_module.text];
		if (ui_manager === undefined) {
			g_AUITool.ShowNotice("错误", "模块不存在");
			return;
		}
		if (ui_manager.control_map[name] !== undefined) {
			g_AUITool.ShowNotice("错误", "控件已存在:" + name);
			return;
		}
		if (ALittleIDE.g_IDECenter.center.content_edit.GetTabById(ALittleIDE.IDEUITabChild, name) !== undefined) {
			g_AUITool.ShowNotice("错误", "控件名已存在:" + name);
			return;
		}
		let control_type = this._control_new_type.text;
		if (control_type === "") {
			g_AUITool.ShowNotice("错误", "请选择控件类型");
			return;
		}
		ALittleIDE.g_IDECenter.center.content_edit.StartEditControlByNew(this._control_new_module.text, name, control_type);
		this._control_new_dialog.visible = false;
	},
}, "ALittleIDE.IDEUIControlList");

}