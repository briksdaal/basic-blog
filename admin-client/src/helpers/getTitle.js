export function getTitle(data) {
  if (!data) {
    return '';
  }

  if (data?.post) {
    return data.post.title;
  }

  if (data?.comment) {
    const content =
      data.comment?.content?.length <= 10
        ? data.comment?.content
        : `${data.comment?.content?.slice(0, 10)}...`;

    return `${data.comment?.author}: ${content}`;
  }

  if (data?.user) {
    return data.user.handle;
  }

  return '';
}
