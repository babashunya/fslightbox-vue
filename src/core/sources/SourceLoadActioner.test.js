import { SourceLoadActioner } from "./SourceLoadActioner";
import { SourceStyler } from "./SourceStyler";
import { FADE_IN_STRONG_CLASS_NAME, OPACITY_1_CLASS_NAME } from "../../constants/classes-names";

const fsLightbox = {
    collections: { sourcesStylers: [] },
    componentsServices: { hideLoaderCollection: [null, jest.fn()] },
    elements: {
        sources: [null, { classList: { add: jest.fn() } }],
        sourcesInners: [null, { classList: { add: jest.fn(), remove: jest.fn() } }]
    },
    resolve: (constructorDependency, params) => {
        if (constructorDependency === SourceStyler) {
            expect(params).toEqual([1, 1000, 1500]);
            return sourceStyler;
        } else {
            throw new Error('Invalid dependency')
        }
    }
};
const sourceStyler = 'source-styler';
const sourceLoadActioner = new SourceLoadActioner(fsLightbox, 1, 1000, 1500);

test('runNormalLoadActions', () => {
    fsLightbox.collections.sourcesStylers[1] = { styleSize: jest.fn() };
    sourceLoadActioner.runNormalLoadActions();
    expect(fsLightbox.elements.sources[1].classList.add).toBeCalledWith(OPACITY_1_CLASS_NAME);
    expect(fsLightbox.elements.sourcesInners[1].classList.add).toBeCalledWith(FADE_IN_STRONG_CLASS_NAME);
    expect(fsLightbox.componentsServices.hideLoaderCollection[1]).toBeCalled();
    expect(fsLightbox.collections.sourcesStylers[1].styleSize).toBeCalled();
});

test('runInitialLoadActions', () => {
    sourceLoadActioner.runNormalLoadActions = jest.fn();
    sourceLoadActioner.runInitialLoadActions();
    expect(sourceLoadActioner.runNormalLoadActions).toBeCalled();
    expect(fsLightbox.collections.sourcesStylers[1]).toBe('source-styler');
});
