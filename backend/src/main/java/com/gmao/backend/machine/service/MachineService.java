package com.gmao.backend.machine.service;
import java.util.List;

import org.springframework.stereotype.Service;

import com.gmao.backend.machine.repository.MachineRepository;
import com.gmao.backend.machine.model.Machine;
import com.gmao.backend.machine.model.MachineView;

@Service
public class MachineService implements MachineServiceInterface{

    private final MachineRepository repository;

    public MachineService(MachineRepository repository) {
        this.repository = repository;
    }
    
    @Override
    public List<MachineView> findAll(){
        return repository.findAll();
    }
    
    @Override
    public Machine save(Machine machine) {
        return repository.save(machine);
    }

    @Override
    public Machine update(Machine machine) {
    int rows = repository.update(machine);

    if (rows == 0) {
        return null; // id inexistant
    }

    return machine;
    }

}
