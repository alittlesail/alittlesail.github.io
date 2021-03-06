-- ALittle Generate Lua And Do Not Edit This Line!
do
if _G.ALittle == nil then _G.ALittle = {} end
local ___rawset = rawset
local ___pairs = pairs
local ___ipairs = ipairs


assert(ALittle.LoopObject, " extends class:ALittle.LoopObject is nil")
ALittle.LoopLinear = Lua.Class(ALittle.LoopObject, "ALittle.LoopLinear")

function ALittle.LoopLinear:Ctor(target, property, target_value, total_time, delay_time, func)
	___rawset(self, "_target", target)
	___rawset(self, "_target_value", target_value)
	___rawset(self, "_func", func)
	if total_time == nil or total_time < 0 then
		total_time = 0
	end
	___rawset(self, "_total_time", total_time)
	if delay_time == nil or delay_time < 0 then
		delay_time = 0
	end
	___rawset(self, "_total_delay_time", delay_time)
	___rawset(self, "_accumulate_time", 0)
	___rawset(self, "_accumulate_delay_time", 0)
	if target == nil or target[property] == nil then
		___rawset(self, "_accumulate_time", self._total_time)
		ALittle.Log("LoopLinear create failed:loop_target is nil or property is nil")
		return
	end
	___rawset(self, "_property", property)
	___rawset(self, "_complete_callback", nil)
	___rawset(self, "_speed", nil)
	___rawset(self, "_init_value", nil)
end

function ALittle.LoopLinear.__getter:complete_callback()
	return self._complete_callback
end

function ALittle.LoopLinear.__setter:complete_callback(value)
	self._complete_callback = value
end

function ALittle.LoopLinear.__getter:speed()
	if self._speed ~= nil then
		return self._speed
	end
	if self._init_value == nil then
		self._init_value = self._target[self._property]
	end
	self._speed = (self._target_value - self._init_value) / self._total_time
	return self._speed
end

function ALittle.LoopLinear:Reset()
	self._accumulate_time = 0
	self._accumulate_delay_time = 0
	self._init_value = nil
end

function ALittle.LoopLinear:SetTime(time)
	self._accumulate_delay_time = 0
	self._accumulate_time = 0
	if time <= 0 then
		return 0, false
	end
	if time <= self._total_delay_time then
		self._accumulate_delay_time = time
		return 0, false
	end
	self._accumulate_delay_time = self._total_delay_time
	time = time - (self._total_delay_time)
	if time < self._total_time then
		self._accumulate_time = time
		if self._init_value == nil then
			self._init_value = self._target[self._property]
		end
		local current_value = (self._accumulate_time * self._target_value + (self._total_time - self._accumulate_time) * self._init_value) / self._total_time
		self._target[self._property] = current_value
		return 0, false
	end
	self._target[self._property] = self._target_value
	self._accumulate_time = self._total_time
	if self._func ~= nil then
		self._func()
	end
	return time - self._total_time, true
end

function ALittle.LoopLinear:IsCompleted()
	return self._accumulate_time >= self._total_time
end

function ALittle.LoopLinear:Completed()
	if self._complete_callback ~= nil then
		self._complete_callback()
	end
end

function ALittle.LoopLinear:SetCompleted()
	if self._accumulate_time >= self._total_time then
		return
	end
	self:SetTime(self._total_time + self._total_delay_time)
end

function ALittle.LoopLinear:Update(frame_time)
	if self._accumulate_delay_time < self._total_delay_time then
		self._accumulate_delay_time = self._accumulate_delay_time + (frame_time)
		if self._accumulate_delay_time < self._total_delay_time then
			return
		end
		frame_time = self._accumulate_delay_time - self._total_delay_time
		self._accumulate_delay_time = self._total_delay_time
	end
	if self._init_value == nil then
		self._init_value = self._target[self._property]
	end
	self._accumulate_time = self._accumulate_time + (frame_time)
	if self._accumulate_time > self._total_time then
		self._accumulate_time = self._total_time
	end
	local current_value = (self._accumulate_time * self._target_value + (self._total_time - self._accumulate_time) * self._init_value) / self._total_time
	self._target[self._property] = current_value
	if self._func ~= nil then
		self._func()
	end
end

end