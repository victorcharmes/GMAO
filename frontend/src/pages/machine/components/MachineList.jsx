function MachineList({ machines }) {
        console.log(machines);
  return (
    <div>
      <h2>Liste des machines</h2>
      <ul>
        {machines.map(machine => (
          <li key={machine.id}>
            <strong>{machine.nom}</strong> - {machine.description} - <img 
                                                                      src={`/photosMachines/${machine.nom}.jpg`}
                                                                      alt={machine.lienPhoto}
                                                                      width="200"
                                                                    />
          </li>
        ))}
      </ul>

    </div>
  );
}

export default MachineList;