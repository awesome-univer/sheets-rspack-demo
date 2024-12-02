import '@univerjs/presets/lib/styles/preset-sheets-core.css'
import '@univerjs/presets/lib/styles/preset-sheets-advanced.css'
import '@univerjs/presets/lib/styles/preset-sheets-filter.css'
import '@univerjs/presets/lib/styles/preset-sheets-collaboration.css'
import '@univerjs/presets/lib/styles/preset-sheets-thread-comment.css'
import '@univerjs/presets/lib/styles/preset-sheets-conditional-formatting.css'
import '@univerjs/presets/lib/styles/preset-sheets-data-validation.css'
import '@univerjs/presets/lib/styles/preset-sheets-drawing.css'
import '@univerjs/presets/lib/styles/preset-sheets-find-replace.css'
import '@univerjs/presets/lib/styles/preset-sheets-hyper-link.css'
import '@univerjs/presets/lib/styles/preset-sheets-sort.css'
import {
  createUniver,
  defaultTheme,
  LocaleType,
  LogLevel,
  Tools,
  UniverSheetsAdvancedPreset,
  UniverSheetsCollaborationPreset,
  UniverSheetsConditionalFormattingPreset,
  UniverSheetsCorePreset,
  UniverSheetsDataValidationPreset,
  UniverSheetsDrawingPreset,
  UniverSheetsFilterPreset,
  UniverSheetsFindReplacePreset,
  UniverSheetsHyperLinkPreset,
  UniverSheetsSortPreset,
  UniverSheetsThreadCommentPreset,
} from '@univerjs/presets'
import sheetsAdvancedEnUs from '@univerjs/presets/preset-sheets-advanced/locales/en-US'
import sheetsCollaborationEnUs from '@univerjs/presets/preset-sheets-collaboration/locales/en-US'
import sheetsConditionalFormattingEnUs from '@univerjs/presets/preset-sheets-conditional-formatting/locales/en-US'
import sheetsCoreEnUs from '@univerjs/presets/preset-sheets-core/locales/en-US'
import sheetsDataValidationEnUs from '@univerjs/presets/preset-sheets-data-validation/locales/en-US'
import sheetsDrawingEnUs from '@univerjs/presets/preset-sheets-drawing/locales/en-US'
import sheetsFilterEnUs from '@univerjs/presets/preset-sheets-filter/locales/en-US'
import sheetsFindReplaceEnUs from '@univerjs/presets/preset-sheets-find-replace/locales/en-US'
import sheetsHyperLinkEnUs from '@univerjs/presets/preset-sheets-hyper-link/locales/en-US'
import sheetsSortEnUs from '@univerjs/presets/preset-sheets-sort/locales/en-US'
import sheetsThreadCommentEnUs from '@univerjs/presets/preset-sheets-thread-comment/locales/en-US'
import { UniverSheetsCrosshairHighlightPlugin } from '@univerjs/sheets-crosshair-highlight'
import UniverSheetsCrosshairHighlightEnUs from '@univerjs/sheets-crosshair-highlight/locale/en-US'
import { UniverSheetsZenEditorPlugin } from '@univerjs/sheets-zen-editor'
import sheetsZenEditorEnUs from '@univerjs/sheets-zen-editor/locale/en-US'

export function setupUniver() {
  const universerEndpoint = window.location.origin

  const collaboration = undefined

  const { univerAPI } = createUniver({
    locale: LocaleType.EN_US,
    locales: {
      [LocaleType.EN_US]: Tools.deepMerge(
        {},
        sheetsCoreEnUs,
        sheetsAdvancedEnUs,
        sheetsCollaborationEnUs,
        sheetsThreadCommentEnUs,
        sheetsConditionalFormattingEnUs,
        sheetsDataValidationEnUs,
        sheetsDrawingEnUs,
        sheetsFilterEnUs,
        sheetsFindReplaceEnUs,
        sheetsHyperLinkEnUs,
        sheetsSortEnUs,
        sheetsZenEditorEnUs,
        UniverSheetsCrosshairHighlightEnUs,
      ),
    },
    collaboration,
    logLevel: LogLevel.VERBOSE,
    theme: defaultTheme,
    presets: [
      UniverSheetsCorePreset({
        container: 'univer',
        header: true,
        footer: true,
        workerURL: new Worker(new URL('./worker.ts', import.meta.url), {
          type: 'module',
        }),
      }),
      UniverSheetsDrawingPreset({
        collaboration,
      }),
      UniverSheetsAdvancedPreset({
        useWorker: true,
        // if univer page is not in the same domain as the server, you need to set the following parameters
        universerEndpoint,
        // if you want to use the no-limit business feature, you can get 30-day trial license from https://univer.ai/pro/license
        // eslint-disable-next-line node/prefer-global/process
        license: 'your license.txt',
      }),
      ...(collaboration ? [UniverSheetsCollaborationPreset({
        universerEndpoint,
      })] : []),
      UniverSheetsThreadCommentPreset({
        collaboration,
      }),
      UniverSheetsConditionalFormattingPreset(),
      UniverSheetsDataValidationPreset(),
      UniverSheetsFilterPreset(),
      UniverSheetsFindReplacePreset(),
      UniverSheetsSortPreset(),
      UniverSheetsHyperLinkPreset(),
    ],
    plugins: [
      UniverSheetsCrosshairHighlightPlugin,
      UniverSheetsZenEditorPlugin,
    ],
  })

  univerAPI.createUniverSheet({})
  return univerAPI
}
