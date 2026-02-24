package com.gmao.backend.machine.service;

import java.util.List;

import com.gmao.backend.machine.model.Machine;
import com.gmao.backend.machine.model.MachineView;

public interface MachineServiceInterface {
    List<MachineView> findAll();
    Machine save(Machine machine);
    public Machine update(Machine machine);
    boolean deleteById(Integer id);
}
