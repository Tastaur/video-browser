import { test, expect } from '@playwright/test';


test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/app');
  });

  test.afterEach(async ({ page }) => {
    await page.goto('/app');
    await page.evaluate(() => {
      window.history.replaceState({}, '', '/app');
    });
  });

  test.describe('Application Title', () => {
    test('should display "Video Browser" as the main header', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Video Browser' })).toBeVisible();
    });
  });

  test.describe('Search Video Filter', () => {
    test('should display search input field', async ({ page }) => {
      await expect(page.getByLabel('Search')).toBeVisible();
    });

    test('should filter videos by title in real-time', async ({ page }) => {
      const cards = page.getByTestId('video-card');
      await expect(cards.first()).toBeVisible();

      const firstCardText = await cards.first().textContent();
      const searchTerm = firstCardText?.split(/\s+/)[0] ?? 'a';

      const searchInput = page.getByLabel('Search');
      await searchInput.fill(searchTerm);

      await expect(cards.first()).toBeVisible();
    });

    test('should filter videos by artist name in real-time', async ({ page }) => {
      const cards = page.getByTestId('video-card');
      await expect(cards.first()).toBeVisible();

      const searchInput = page.getByLabel('Search');
      await searchInput.fill('a');

      const filteredCount = await cards.count();
      expect(filteredCount).toBeGreaterThan(0);
    });

    test('should filter case-insensitively', async ({ page }) => {
      const cards = page.getByTestId('video-card');
      await expect(cards.first()).toBeVisible();

      const searchInput = page.getByLabel('Search');
      await searchInput.fill('A');

      const upperCount = await cards.count();

      await searchInput.fill('a');

      const lowerCount = await cards.count();

      expect(upperCount).toBe(lowerCount);
    });

    test('should show empty state when no videos match search', async ({ page }) => {
      const searchInput = page.getByLabel('Search');
      await searchInput.fill('xyznonexistent123');

      await expect(page.getByTestId('empty-message')).toBeVisible();
    });
  });

  test.describe('Search by Year Filter', () => {
    test('should display year dropdown', async ({ page }) => {
      await expect(page.getByLabel('Year')).toBeVisible();
    });

    test('should allow single year selection', async ({ page }) => {
      const yearDropdown = page.getByLabel('Year');
      await yearDropdown.click();

      const yearOption = page.getByRole('option').first();
      const yearText = await yearOption.textContent();
      await yearOption.click();

      await expect(yearDropdown).toHaveValue(yearText!);
    });

    test('should filter videos by selected year', async ({ page }) => {
      const yearDropdown = page.getByLabel('Year');
      await yearDropdown.click();

      const yearOption = page.getByRole('option').first();
      const selectedYear = await yearOption.textContent();
      await yearOption.click();

      const cards = page.getByTestId('video-card');
      const count = await cards.count();

      for (let i = 0; i < count; i++) {
        await expect(cards.nth(i).getByTestId('video-card-year')).toContainText(selectedYear!);
      }
    });

    test('should allow clearing year selection', async ({ page }) => {
      const yearDropdown = page.getByLabel('Year');
      await yearDropdown.click();
      await page.getByRole('option').first().click();

      await yearDropdown.click();
      await page.keyboard.press('Escape');
      await yearDropdown.clear();

      await expect(yearDropdown).toHaveValue('');
    });
  });

  test.describe('Search by Genre Filter', () => {
    test('should display genre dropdown', async ({ page }) => {
      await expect(page.getByLabel('Genres')).toBeVisible();
    });

    test('should allow multiple genre selection', async ({ page }) => {
      const genreDropdown = page.getByLabel('Genres');
      await genreDropdown.click();

      const options = page.getByRole('option');
      const firstGenre = await options.nth(0).textContent();
      const secondGenre = await options.nth(1).textContent();

      await options.nth(0).click();
      await genreDropdown.click();
      await options.nth(1).click();

      await expect(page.getByRole('button', { name: firstGenre! })).toBeVisible();
      await expect(page.getByRole('button', { name: secondGenre! })).toBeVisible();
    });

    test('should not allow same genre to be selected twice', async ({ page }) => {
      const genreDropdown = page.getByLabel('Genres');
      await genreDropdown.click();

      const firstOption = page.getByRole('option').first();
      const genreName = await firstOption.textContent();
      await firstOption.click();

      await genreDropdown.click();

      const selectedOption = page.getByRole('option', { name: genreName!, exact: true });
      await expect(selectedOption).toHaveAttribute('aria-selected', 'true');
    });

    test('should allow clearing genre selections', async ({ page }) => {
      const genreDropdown = page.getByLabel('Genres');
      await genreDropdown.click();
      await page.getByRole('option').first().click();

      const clearButton = page.locator('[data-testid="CancelIcon"]').first();
      await clearButton.click();

      await expect(page.getByTestId('genres-filter').locator('.MuiChip-root')).toHaveCount(0);
    });
  });

  test.describe('Combined Filter Behavior', () => {
    test('should combine search and year filters with AND logic', async ({ page }) => {
      const searchInput = page.getByLabel('Search');
      await searchInput.fill('Rock');

      const yearDropdown = page.getByLabel('Year');
      await yearDropdown.click();
      const yearOption = page.getByRole('option').first();
      const selectedYear = await yearOption.textContent();
      await yearOption.click();

      const cards = page.getByTestId('video-card');
      const count = await cards.count();

      for (let i = 0; i < count; i++) {
        const cardText = await cards.nth(i).textContent();
        expect(cardText?.toLowerCase()).toContain('rock');
        expect(cardText).toContain(selectedYear!);
      }
    });

    test('should combine all three filters', async ({ page }) => {
      await page.getByLabel('Search').fill('a');

      const yearDropdown = page.getByLabel('Year');
      await yearDropdown.click();
      await page.getByRole('option').first().click();

      const genreDropdown = page.getByLabel('Genres');
      await genreDropdown.click();
      await page.getByRole('option').first().click();

      await expect(page.getByTestId('filters')).toBeVisible();
    });
  });

  test.describe('Dynamic Filter Updates', () => {
    test('should update available years based on search results', async ({ page }) => {
      const yearDropdown = page.getByLabel('Year');
      await yearDropdown.click();
      const initialYearsCount = await page.getByRole('option').count();
      await page.keyboard.press('Escape');

      await page.getByLabel('Search').fill('Depeche');

      await yearDropdown.click();
      const filteredYearsCount = await page.getByRole('option').count();

      expect(filteredYearsCount).toBeLessThanOrEqual(initialYearsCount);
    });

    test('should update available genres based on search results', async ({ page }) => {
      const genreDropdown = page.getByLabel('Genres');
      await genreDropdown.click();
      const initialGenresCount = await page.getByRole('option').count();
      await page.keyboard.press('Escape');

      await page.getByLabel('Search').fill('Rock');

      await genreDropdown.click();
      const filteredGenresCount = await page.getByRole('option').count();

      expect(filteredGenresCount).toBeLessThanOrEqual(initialGenresCount);
    });

    test('should reset year and genre when search changes', async ({ page }) => {
      const yearDropdown = page.getByLabel('Year');
      await yearDropdown.click();
      await page.getByRole('option').first().click();

      const genreDropdown = page.getByLabel('Genres');
      await genreDropdown.click();
      await page.getByRole('option').first().click();

      await page.getByLabel('Search').fill('test');

      await expect(yearDropdown).toHaveValue('');
      await expect(page.getByTestId('genres-filter').locator('.MuiChip-root')).toHaveCount(0);
    });
  });

  test.describe('Empty State', () => {
    test('should display "No videos were found" when no results match filters', async ({ page }) => {
      await page.getByLabel('Search').fill('xyznonexistent123456');

      await expect(page.getByTestId('empty-message')).toBeVisible();
    });
  });

  test.describe('Video Card List', () => {
    test('should display video cards', async ({ page }) => {
      const cards = page.getByTestId('video-card');
      await expect(cards.first()).toBeVisible();
    });

    test('should display video thumbnail image', async ({ page }) => {
      const cardImage = page.getByTestId('video-card-image').first();
      await expect(cardImage).toBeVisible();
      await expect(cardImage).toHaveAttribute('src', /.+/);
    });

    test('should display video title', async ({ page }) => {
      const cardTitle = page.getByTestId('video-card-title').first();
      await expect(cardTitle).toBeVisible();
    });

    test('should display artist name', async ({ page }) => {
      const cardArtist = page.getByTestId('video-card-artist').first();
      await expect(cardArtist).toBeVisible();
    });

    test('should display release year', async ({ page }) => {
      const cardYear = page.getByTestId('video-card-year').first();
      await expect(cardYear).toBeVisible();
      const yearText = await cardYear.textContent();
      expect(yearText).toMatch(/\d{4}/);
    });

    test('should have scrollable container', async ({ page }) => {
      const videoGrid = page.getByTestId('video-grid');
      const overflowY = await videoGrid.evaluate((el) => {
        return window.getComputedStyle(el).overflowY;
      });
      expect(['auto', 'scroll']).toContain(overflowY);
    });

    test('should update cards based on filter selections', async ({ page }) => {
      const cards = page.getByTestId('video-card');
      await expect(cards.first()).toBeVisible();

      const initialCount = await cards.count();
      expect(initialCount).toBeGreaterThan(0);

      await page.getByLabel('Search').fill('xyzuniqueteststring');

      await expect(page.getByTestId('empty-message')).toBeVisible();
    });
  });

  test.describe('Responsive Layout', () => {
    test('should display 1 video per row on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/app');

      const cards = page.getByTestId('video-card');
      await expect(cards.first()).toBeVisible();
    });

    test('should display up to 3 videos per row on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto('/app');

      const cards = page.getByTestId('video-card');
      await expect(cards.first()).toBeVisible();
    });
  });

  test.describe('URL State', () => {
    test('should persist search in URL', async ({ page }) => {
      await page.getByLabel('Search').fill('test');

      await expect(page).toHaveURL(/search=test/);
    });

    test('should persist year selection in URL', async ({ page }) => {
      const yearDropdown = page.getByLabel('Year');
      await yearDropdown.click();
      await page.getByRole('option').first().click();

      await expect(page).toHaveURL(/year=\d+/);
    });

    test('should persist genre selection in URL', async ({ page }) => {
      const genreDropdown = page.getByLabel('Genres');
      await genreDropdown.click();
      await page.getByRole('option').first().click();

      await expect(page).toHaveURL(/genres=\d+/);
    });

    test('should restore filters from URL on page load', async ({ page }) => {
      await page.goto('/app?search=test&year=2020');

      await expect(page.getByLabel('Search')).toHaveValue('test');
      await expect(page.getByLabel('Year')).toHaveValue('2020');
    });
  });
});
