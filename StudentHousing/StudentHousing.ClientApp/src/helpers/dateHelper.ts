const getFormattedString = (dateString: string) => {
  const date = new Date(dateString);
  const currentUtcTime = new Date().getTime();
  const diffTime = currentUtcTime - date.getTime();

  const utcDate1DayAgo = currentUtcTime - 1000 * 60 * 60 * 24;

  if (date.getTime() < utcDate1DayAgo) {
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} d`;
  }

  const utcDate12HrsAgo = currentUtcTime - 1000 * 60 * 60;

  if (date.getTime() < utcDate12HrsAgo) {
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    return `${diffHours} h`;
  }

  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  return diffMinutes == 1 ? "now" : `${diffMinutes} m`;
};

const DateHelper = {
  getFormattedString,
};

export default DateHelper;
