package com.gmao.backend.machine.service;

import java.util.List;

import com.gmao.backend.machine.model.MachineView;

public interface MachineServiceInterface {
    List<MachineView> findAll();
}
