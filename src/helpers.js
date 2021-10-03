const API = 
  "https://us-central1-crown-db-1f1b5.cloudfunctions.net/checkout";

export async function fetchFromAPI(endpoint, opts, user) {
  const { method, body } = { method: 'POST', body: null, ...opts };
  // const user = auth.currentUser;
  const token = user && (await user.getIdToken());
  const res = await fetch(`${API}/${endpoint}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  });

  if (res.status === 200) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
}