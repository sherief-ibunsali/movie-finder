import { useState } from "react";

const data = [
  {
    id: 1,
    category: "Books",
    name: "Horry Porter",
    creator: "Sherief",
    date: "Today",
    update: "Just Now",
    number: 2,
  },
  {
    id: 2,
    category: "Entertain",
    name: "Leo",
    creator: "Miskath",
    date: "Today",
    update: "Just Now",
    number: 5,
  },
  {
    id: 3,
    category: "Entertain",
    name: "COC",
    creator: "Ibunsali",
    date: "Today",
    update: "Just Now",
    number: 1,
  },
];

const container = {
  width: "700px",
  marginTop: "0",
  marginBottom: "0",
  marginLeft: "auto",
  marginRight: "auto",
  border: "1px solid black",
  padding: "10px",
};

const btn = {
  height: "30px",
  padding: "8px",
  cursor: "pointer",
};

function EditForm({ selectedID, setSelectedID }) {
  function handleEditSubmit(e) {
    e.preventDefault();
    const editData = {
      id: Date.now(),
      name: selectedID.name,
      category: selectedID.category,
      number: Number(selectedID.number),
      date: selectedID.date,
      creator: selectedID.creator,
      update: "Just Now",
    };
    console.log(editData);
  }
  return (
    <form style={form} onSubmit={handleEditSubmit}>
      <label>Name:</label>
      <input
        type="text"
        placeholder="Name..."
        value={selectedID.name}
        onChange={(e) => setSelectedID(e.target.value)}
      />
      <label>Category:</label>
      <select
        value={selectedID.category}
        onChange={(e) => setSelectedID(e.target.value)}
      >
        <option>Books</option>
        <option>Entertain</option>
        <option>Tablet</option>
        <option>Education</option>
        <option>Creator</option>
      </select>
      <label>Number:</label>
      <input
        type="number"
        placeholder="Number..."
        value={selectedID.number}
        onChange={(e) => setSelectedID(e.target.value)}
      />
      <label>Date:</label>
      <input
        type="date"
        placeholder="Date..."
        value={selectedID.date}
        onChange={(e) => setSelectedID(e.target.value)}
      />
      <label>Creator:</label>
      <input
        type="text"
        placeholder="Creator..."
        value={selectedID.creator}
        onChange={(e) => setSelectedID(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

export default function Sample() {
  const [addNewExpense, setAddNewExpense] = useState(false);
  const [dataT, setDataT] = useState(data);
  const [selectedID, setSelectedID] = useState(null);
  const [edit, setEdit] = useState(false);

  function handleAddNewExpForm() {
    setAddNewExpense((hd) => !hd);
  }
  function handleNewData(data) {
    setDataT([...dataT, data]);
  }

  function handleSelect(id) {
    setSelectedID(id);
    setEdit(true);
  }

  function handleDelete(del) {
    setDataT((data) =>
      data.filter(function (fil) {
        return fil.id !== del;
      })
    );
  }

  return (
    <div style={container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>My Expense Table</h2>
        <button style={btn} onClick={handleAddNewExpForm}>
          {addNewExpense ? "Close" : "Add Form"}
        </button>
      </div>
      <div>
        {addNewExpense && (
          <AddNewExpense
            onAddData={handleNewData}
            setAddNewExpense={setAddNewExpense}
          />
        )}
        {edit && (
          <EditForm selectedID={selectedID} setSelectedID={setSelectedID} />
        )}
        <TableContainer
          dataT={dataT}
          onDelete={handleDelete}
          onEdit={handleSelect}
        />
      </div>
    </div>
  );
}

function TableContainer({ dataT, onDelete, onEdit }) {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Number</th>
          <th>Date</th>
          <th>Update</th>
          <th>creator</th>
          <th>Buttons</th>
        </tr>
      </thead>
      <tbody>
        {dataT.map(function (data, i) {
          return (
            <TableData
              data={data}
              key={i}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          );
        })}
      </tbody>
    </table>
  );
}

function TableData({ data, onDelete, onEdit }) {
  return (
    <tr>
      <th>{data.name}</th>
      <th>{data.category}</th>
      <th>{data.number}</th>
      <th>{data.date}</th>
      <th>{data.update}</th>
      <th>{data.creator}</th>
      <th>
        <button onClick={() => onEdit(data)}>Edit</button>
        <button onClick={() => onDelete(data.id)}>Delete</button>
      </th>
    </tr>
  );
}

const form = {
  display: "flex",
  flexDirection: "column",
  width: "300px",
  padding: "20px",
  marginTop: "0",
  marginBottom: "0",
  marginLeft: "auto",
  marginRight: "auto",
  gap: "3px",
};
function AddNewExpense({ onAddData, setAddNewExpense }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [creator, setCreator] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      name: name,
      category: category,
      number: Number(number),
      date: date,
      creator: creator,
      update: "Just Now",
    };
    console.log(newItem);
    onAddData(newItem);
    setAddNewExpense(false);
  }
  return (
    <form style={form} onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        placeholder="Name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Books</option>
        <option>Entertain</option>
        <option>Tablet</option>
        <option>Education</option>
        <option>Creator</option>
      </select>
      <label>Number:</label>
      <input
        type="number"
        placeholder="Number..."
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <label>Date:</label>
      <input
        type="date"
        placeholder="Date..."
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label>Creator:</label>
      <input
        type="text"
        placeholder="Creator..."
        value={creator}
        onChange={(e) => setCreator(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
