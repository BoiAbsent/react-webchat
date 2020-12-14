export const post = async (url, params) => {
  try {
      const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(params),
          cache: 'default',
          credentials: 'include',
          mode: 'cors'
      })
      const data = await res.json()
      return data
  } catch(err) {
      return {
          rst: 0,
          err: err
      }
  }
}