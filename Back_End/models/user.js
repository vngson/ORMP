const { getClient } = require("../config/postgres");

exports.getEmailCustomer = async function (email) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'select * from public."Customers" where "Email" = $1',
      [email]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getPhoneCustomer = async function (phone) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'select * from public."Customers" where "Phone" = $1',
      [phone]
    );
    return rs.rows;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.findPhoneUser = async function (phone) {
  const client = await getClient();
  try {
    const rs = await client.query(
      'select * from public."Account" where "Username" = $1',
      [phone]
    );
    return rs.rows[0];
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getLastIdCustomer = async function () {
  const client = await getClient();
  try {
    const rs = await client.query('select * from public."Customers"');
    return rs.rows.length + 1;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.getLastIdUser = async function () {
  const client = await getClient();
  try {
    const rs = await client.query('select * from public."Account"');
    return rs.rows.length + 2;
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.insertCustomer = async function (data) {
  const client = await getClient();
  try {
    const rs = await client.query(
      `insert into public.\"Customers\"(\"ID_Customers\",\"NAME\", \"Birthday\", \"Address\", \"Email\", \"Phone\")
    VALUES ($1, $2, $3, $4,$5,$6) returning *`,
      [data.id, data.name, data.birthday, data.address, data.email, data.phone]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};

exports.insertUser = async function (data) {
  const client = await getClient();
  try {
    const rs = await client.query(
      `insert into public.\"Account\"(\"ID_Login\",\"Username\", \"Pass\", \"CREATED_DATE\", \"ROLE\", \"Status\")
      VALUES ($1, $2, $3, $4,$5,$6) returning *`,
      [data.id, data.phone, data.password, data.cDate, data.role, "unlocked"]
    );
  } finally {
    client.release(); // Giải phóng kết nối
  }
};
