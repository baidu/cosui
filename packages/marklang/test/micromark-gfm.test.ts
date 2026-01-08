import {gfm} from '../src/extensions/micromark-gfm';
import {combineExtensions} from 'micromark-util-combine-extensions';
import {gfmAutolinkLiteral} from 'micromark-extension-gfm-autolink-literal';
import {gfmFootnote} from 'micromark-extension-gfm-footnote';
import {gfmStrikethrough} from 'micromark-extension-gfm-strikethrough';
import {gfmTable} from 'micromark-extension-gfm-table';

// Mock the dependencies
jest.mock('micromark-util-combine-extensions');
jest.mock('micromark-extension-gfm-autolink-literal');
jest.mock('micromark-extension-gfm-footnote');
jest.mock('micromark-extension-gfm-strikethrough');
jest.mock('micromark-extension-gfm-table');

describe('gfm function', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
        
        // Setup mock implementations
        (combineExtensions as jest.Mock).mockReturnValue({});
        (gfmAutolinkLiteral as jest.Mock).mockReturnValue({ type: 'autolink' });
        (gfmFootnote as jest.Mock).mockReturnValue({ type: 'footnote' });
        (gfmStrikethrough as jest.Mock).mockReturnValue({ type: 'strikethrough' });
        (gfmTable as jest.Mock).mockReturnValue({ type: 'table' });
    });

    it('should include autolink extension when options.autolink is true', () => {
        const options = { autolink: true };
        gfm(options);

        expect(gfmAutolinkLiteral).toHaveBeenCalled();
        expect(combineExtensions).toHaveBeenCalledWith([
            { type: 'autolink' },
            { type: 'footnote' },
            { type: 'strikethrough' },
            { type: 'table' }
        ]);
    });

    it('should exclude autolink extension when options.autolink is false', () => {
        const options = { autolink: false };
        gfm(options);

        expect(gfmAutolinkLiteral).not.toHaveBeenCalled();
        expect(combineExtensions).toHaveBeenCalledWith([
            { type: 'footnote' },
            { type: 'strikethrough' },
            { type: 'table' }
        ]);
    });

    it('should exclude autolink extension when options.autolink is undefined', () => {
        const options = {};
        gfm(options);

        expect(gfmAutolinkLiteral).not.toHaveBeenCalled();
        expect(combineExtensions).toHaveBeenCalledWith([
            { type: 'footnote' },
            { type: 'strikethrough' },
            { type: 'table' }
        ]);
    });

    it('should work without options', () => {
        gfm();

        expect(gfmAutolinkLiteral).not.toHaveBeenCalled();
        expect(combineExtensions).toHaveBeenCalledWith([
            { type: 'footnote' },
            { type: 'strikethrough' },
            { type: 'table' }
        ]);
    });

    it('should pass options to gfmStrikethrough', () => {
        const options = { singleTilde: true };
        gfm(options);

        expect(gfmStrikethrough).toHaveBeenCalledWith(options);
    });
});