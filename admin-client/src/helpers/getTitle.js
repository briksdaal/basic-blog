export function getTitle(data) {
  if (!data) {
    return null;
  }

  if (data?.post) {
    return {
      parent: 'Posts',
      current: data.post.title
    };
  }

  if (data?.comment) {
    const content =
      data.comment?.content?.length <= 10
        ? data.comment?.content
        : `${data.comment?.content?.slice(0, 10)}...`;

    return {
      parent: 'Comments',
      current: `${data.comment?.author}: ${content}`
    };
  }

  if (data?.user) {
    return {
      parent: 'Users',
      current: data.user.handle
    };
  }

  return '';
}
