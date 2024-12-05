function navigateToPage(url, noHistory = false) {
    if (noHistory) {
      // This will navigate to the URL and refresh the page, but not maintaining history
      window.location.replace(url);
    } else {
      // This will navigate to the URL and refresh the page, while maintaining history
      window.location.href = url;
    }
  }

  export default navigateToPage;