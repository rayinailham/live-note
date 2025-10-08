import { test, expect } from '@playwright/test';

test.describe('Livestream Timestamp App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display the app title', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Live Note - Livestream Timestamp Tool');
  });

  test('should start and stop timer', async ({ page }) => {
    const startButton = page.locator('button:has-text("Start Timer")');
    const stopButton = page.locator('button:has-text("Stop Timer")');
    const timerDisplay = page.locator('div.text-4xl');

    // Initial state
    await expect(startButton).toBeVisible();
    await expect(stopButton).not.toBeVisible();
    await expect(timerDisplay).toHaveText('00:00:00');

    // Start timer
    await startButton.click();
    await expect(stopButton).toBeVisible();
    await expect(startButton).not.toBeVisible();

    // Wait a bit and check timer is running
    await page.waitForTimeout(2000);
    const timeAfterStart = await timerDisplay.textContent();
    expect(timeAfterStart).not.toBe('00:00:00');

    // Stop timer
    await stopButton.click();
    await expect(startButton).toBeVisible();
    await expect(stopButton).not.toBeVisible();
  });

  test('should add notes with timestamps', async ({ page }) => {
    const startButton = page.locator('button:has-text("Start Timer")');
    const noteInput = page.locator('#noteInput');
    const addNoteButton = page.locator('button:has-text("Add Note")');
    const notesList = page.locator('ul.space-y-2');

    // Start timer
    await startButton.click();

    // Add a note
    await noteInput.fill('Test note');
    await addNoteButton.click();

    // Check note is added
    await expect(notesList.locator('li')).toHaveCount(1);
    const noteText = await notesList.locator('li').first().textContent();
    expect(noteText).toMatch(/\d{2}:\d{2}:\d{2} - Test note/);
  });

  test('should not add empty notes', async ({ page }) => {
    const startButton = page.locator('button:has-text("Start Timer")');
    const addNoteButton = page.locator('button:has-text("Add Note")');

    await startButton.click();
    // Button should be disabled when input is empty
    await expect(addNoteButton).toBeDisabled();
  });

  test('should export notes', async ({ page }) => {
    const startButton = page.locator('button:has-text("Start Timer")');
    const noteInput = page.locator('#noteInput');
    const addNoteButton = page.locator('button:has-text("Add Note")');
    const exportButton = page.locator('button:has-text("Export Notes")');

    // Start timer and add note
    await startButton.click();
    await noteInput.fill('Export test');
    await addNoteButton.click();

    // Mock download
    const downloadPromise = page.waitForEvent('download');
    await exportButton.click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('livestream-notes.txt');
  });

  test('should save stream to archive', async ({ page }) => {
    const streamNameInput = page.locator('#streamName');
    const startButton = page.locator('button:has-text("Start Timer")');
    const noteInput = page.locator('#noteInput');
    const addNoteButton = page.locator('button:has-text("Add Note")');
    const saveButton = page.locator('button:has-text("Save Stream")');
    const notesList = page.locator('ul.space-y-2');

    await streamNameInput.fill('Test Stream');
    await expect(streamNameInput).toHaveValue('Test Stream');
    await startButton.click();
    await page.waitForTimeout(1000); // Wait for timer to start
    await noteInput.fill('Archived note');
    await addNoteButton.click();
    await page.waitForTimeout(100); // Wait for state update
    await expect(notesList.locator('li')).toHaveCount(1);
    await expect(saveButton).toBeEnabled();
    await saveButton.click();

    // Check if stream name and notes are cleared after save
    await expect(streamNameInput).toHaveValue('');
    await expect(notesList.locator('li')).toHaveCount(0);
  });

  test('should handle edge case: add note without starting timer', async ({ page }) => {
    const noteInput = page.locator('#noteInput');
    const addNoteButton = page.locator('button:has-text("Add Note")');

    await noteInput.fill('Note without timer');
    // Button should be disabled when timer not running
    await expect(addNoteButton).toBeDisabled();
  });

  test('should clear notes after save', async ({ page }) => {
    const streamNameInput = page.locator('#streamName');
    const startButton = page.locator('button:has-text("Start Timer")');
    const noteInput = page.locator('#noteInput');
    const addNoteButton = page.locator('button:has-text("Add Note")');
    const saveButton = page.locator('button:has-text("Save Stream")');

    await streamNameInput.fill('Test Stream');
    await startButton.click();
    await page.waitForTimeout(1000);
    await noteInput.fill('Test note');
    await addNoteButton.click();
    await expect(page.locator('ul.space-y-2 li')).toHaveCount(1);

    await expect(saveButton).toBeEnabled();
    await saveButton.click();
    await expect(page.locator('ul.space-y-2 li')).toHaveCount(0);
  });
});