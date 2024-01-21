import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  User,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  noStore();
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // const data = await sql<Revenue>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return [
      {
        month: "Jan",
        revenue: 2000
      },
      {
        month: "Feb",
        revenue: 1700
      },
      {
        month: "Jul",
        revenue: 3800
      }
    ];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  noStore();
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // const data = await sql<LatestInvoiceRaw>`
    //   SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   ORDER BY invoices.date DESC
    //   LIMIT 5`;

    // const latestInvoices = data.rows.map((invoice) => ({
    //   ...invoice,
    //   amount: formatCurrency(invoice.amount),
    // }));
    return [
      {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'Delba de Oliveira',
        email: 'delba@oliveira.com',
        image_url: '/customers/delba-de-oliveira.png',
        amount: formatCurrency(8945 ?? '0')
      },
      {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        name: 'Lee Robinson',
        email: 'lee@robinson.com',
        image_url: '/customers/lee-robinson.png',
        amount: formatCurrency(44800 ?? '0')
      },
      {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
        name: 'Hector Simpson',
        email: 'hector@simpson.com',
        image_url: '/customers/hector-simpson.png',
        amount: formatCurrency(500 ?? '0')
      },
      {
        id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
        name: 'Steven Tey',
        email: 'steven@tey.com',
        image_url: '/customers/steven-tey.png',
        amount: formatCurrency(34577 ?? '0')
      },
      {
        id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
        name: 'Steph Dietz',
        email: 'steph@dietz.com',
        image_url: '/customers/steph-dietz.png',
        amount: formatCurrency(54246 ?? '0')
      }
    ];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  noStore();
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    // const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    // const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    // const invoiceStatusPromise = sql`SELECT
    //      SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
    //      SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
    //      FROM invoices`;

    // const data = await Promise.all([
    //   invoiceCountPromise,
    //   customerCountPromise,
    //   invoiceStatusPromise,
    // ]);

    const numberOfInvoices = Number(15 ?? '0');
    const numberOfCustomers = Number(8 ?? '0');
    const totalPaidInvoices = formatCurrency(110636 ?? '0');
    const totalPendingInvoices = formatCurrency(133911 ?? '0');

    return {
      numberOfInvoices,
      numberOfCustomers,
      totalPaidInvoices,
      totalPendingInvoices
    }
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // const invoices = await sql<InvoicesTable>`
    //   SELECT
    //     invoices.id,
    //     invoices.amount,
    //     invoices.date,
    //     invoices.status,
    //     customers.name,
    //     customers.email,
    //     customers.image_url
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   WHERE
    //     customers.name ILIKE ${`%${query}%`} OR
    //     customers.email ILIKE ${`%${query}%`} OR
    //     invoices.amount::text ILIKE ${`%${query}%`} OR
    //     invoices.date::text ILIKE ${`%${query}%`} OR
    //     invoices.status ILIKE ${`%${query}%`}
    //   ORDER BY invoices.date DESC
    // LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    // `;

    return [
      {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'Delba de Oliveira',
        email: 'delba@oliveira.com',
        image_url: '/customers/delba-de-oliveira.png',
        amount: formatCurrency(8945 ?? '0'),
        date: '19/01/2023',
        status: 'pending'
      },
      {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        name: 'Lee Robinson',
        email: 'lee@robinson.com',
        image_url: '/customers/lee-robinson.png',
        amount: formatCurrency(44800 ?? '0'),
        date: '19/01/2023',
        status: 'pending'
      },
      {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
        name: 'Hector Simpson',
        email: 'hector@simpson.com',
        image_url: '/customers/hector-simpson.png',
        amount: formatCurrency(500 ?? '0'),
        date: '19/01/2023',
        status: 'pending'
      },
      {
        id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
        name: 'Steven Tey',
        email: 'steven@tey.com',
        image_url: '/customers/steven-tey.png',
        amount: formatCurrency(34577 ?? '0'),
        date: '19/01/2023',
        status: 'pending'
      },
      {
        id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
        name: 'Steph Dietz',
        email: 'steph@dietz.com',
        image_url: '/customers/steph-dietz.png',
        amount: formatCurrency(54246 ?? '0'),
        date: '19/01/2023',
        status: 'pending'
      },
      {
        id: '3958dc9e-787f-4377-85e9-fec4b6a6443a',
        name: 'Steph Dietzz',
        email: 'steph@dietzz.com',
        image_url: '/customers/steph-dietz.png',
        amount: formatCurrency(54244 ?? '0'),
        date: '19/01/2023',
        status: 'pending'
      }
    ]
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    noStore();
    //   const count = await sql`SELECT COUNT(*)
    //   FROM invoices
    //   JOIN customers ON invoices.customer_id = customers.id
    //   WHERE
    //     customers.name ILIKE ${`%${query}%`} OR
    //     customers.email ILIKE ${`%${query}%`} OR
    //     invoices.amount::text ILIKE ${`%${query}%`} OR
    //     invoices.date::text ILIKE ${`%${query}%`} OR
    //     invoices.status ILIKE ${`%${query}%`}
    // `;

    // const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return 30;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    noStore();
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    // const data = await sql<CustomerField>`
    //   SELECT
    //     id,
    //     name
    //   FROM customers
    //   ORDER BY name ASC
    // `;

    // const customers = data.rows;
    return [
      {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        name: 'Delba de Oliveira'
      },
      {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        name: 'Lee Robinson'
      },
      {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
        name: 'Hector Simpson'
      },
      {
        id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
        name: 'Steven Tey'
      },
      {
        id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
        name: 'Steph Dietz'
      }
    ];
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
