export function generatePostLink(post, structure) {
  if (!post || !structure) return '#';
  
  let date = new Date();
  if (post.createdAt) {
    // Suporta Timestamp do Firebase, milissegundos ou String
    if (typeof post.createdAt.toDate === 'function') {
      date = post.createdAt.toDate();
    } else if (typeof post.createdAt.toMillis === 'function') {
      date = new Date(post.createdAt.toMillis());
    } else {
      date = new Date(post.createdAt);
    }
  }

  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  let link = structure;
  link = link.replace(':slug', post.slug || '');
  link = link.replace(':id', post.id || '');
  link = link.replace(':year', year);
  link = link.replace(':month', month);
  link = link.replace(':day', day);

  return link.startsWith('/') ? link : `/${link}`;
}
