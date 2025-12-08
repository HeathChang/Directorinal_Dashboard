import React, { useState, useEffect } from 'react';
import { IconX } from '@tabler/icons-react';
import { Input } from '../../atoms/Input';
import { Textarea } from '../../atoms/Textarea';
import { Select } from '../../atoms/Select';
import type { SelectOption } from '../../atoms/Select';

import { Button } from '@mui/material';
import type { iPostRequest, PostCategory } from '../../../types/general.type';
import { POST_CATEGORY_OPTIONS, POST_LIMITS } from '../../../constants/post.constant';
import { FORBIDDEN_WORD_FILTER } from '../../../constants/general.constant';

export interface PostFormProps {
    initialData?: Partial<iPostRequest>;
    onSubmit: (data: iPostRequest) => void;
    onCancel: () => void;
    isLoading?: boolean;
}

export const PostForm: React.FC<PostFormProps> = ({
    initialData,
    onSubmit,
    onCancel,
    isLoading = false
}) => {
    const [formData, setFormData] = useState<iPostRequest>(() => ({
        title: initialData?.title || '',
        body: initialData?.body || '',
        category: initialData?.category || 'FREE',
        tags: initialData?.tags || []
    }));

    const [tagInput, setTagInput] = useState('');
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                body: initialData.body || '',
                category: initialData.category || 'FREE',
                tags: initialData.tags || []
            });
        }
    }, [initialData]);

    // 금칙어 검증
    const checkForbiddenWords = (text: string): string | null => {
        for (const word of FORBIDDEN_WORD_FILTER) {
            if (text.includes(word)) {
                return `금지된 단어 "${word}"가 포함되어 있습니다.`;
            }
        }
        return null;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        // 제목 검증
        if (!formData.title.trim()) {
            newErrors.title = '제목을 입력해주세요.';
        } else if (formData.title.length > POST_LIMITS.TITLE_MAX_LENGTH) {
            newErrors.title = `제목은 ${POST_LIMITS.TITLE_MAX_LENGTH}자 이하여야 합니다.`;
        }

        // 본문 검증
        if (!formData.body.trim()) {
            newErrors.body = '본문을 입력해주세요.';
        } else if (formData.body.length > POST_LIMITS.BODY_MAX_LENGTH) {
            newErrors.body = `본문은 ${POST_LIMITS.BODY_MAX_LENGTH}자 이하여야 합니다.`;
        } else {
            const forbiddenError = checkForbiddenWords(formData.body);
            if (forbiddenError) {
                newErrors.body = forbiddenError;
            }
        }

        // 태그 검증
        if (formData.tags.length > POST_LIMITS.TAGS_MAX_COUNT) {
            newErrors.tags = `태그는 최대 ${POST_LIMITS.TAGS_MAX_COUNT}개까지 가능합니다.`;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        onSubmit(formData);
    };

    const handleAddTag = () => {
        const trimmedTag = tagInput.trim();
        if (!trimmedTag) return;

        if (formData.tags.length >= POST_LIMITS.TAGS_MAX_COUNT) {
            setErrors({ ...errors, tags: `태그는 최대 ${POST_LIMITS.TAGS_MAX_COUNT}개까지 가능합니다.` });
            return;
        }

        if (trimmedTag.length > POST_LIMITS.TAG_MAX_LENGTH) {
            setErrors({ ...errors, tags: `태그는 ${POST_LIMITS.TAG_MAX_LENGTH}자 이하여야 합니다.` });
            return;
        }

        // 중복 제거
        if (formData.tags.includes(trimmedTag)) {
            setErrors({ ...errors, tags: '이미 추가된 태그입니다.' });
            return;
        }

        setFormData({
            ...formData,
            tags: [...formData.tags, trimmedTag]
        });
        setTagInput('');
        setErrors({ ...errors, tags: '' });
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter(tag => tag !== tagToRemove)
        });
    };

    const categoryOptions: SelectOption[] = POST_CATEGORY_OPTIONS;

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="제목"
                value={formData.title}
                onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    setErrors({ ...errors, title: '' });
                }}
                error={errors.title}
                maxLength={POST_LIMITS.TITLE_MAX_LENGTH}
                required
            />

            <Textarea
                label="본문"
                value={formData.body}
                onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, body: value });
                    setErrors({ ...errors, body: '' });
                    // 실시간 금칙어 검증
                    if (value) {
                        const forbiddenError = checkForbiddenWords(value);
                        if (forbiddenError) {
                            setErrors({ ...errors, body: forbiddenError });
                        }
                    }
                }}
                error={errors.body}
                maxLength={POST_LIMITS.BODY_MAX_LENGTH}
                showCount
                rows={10}
                required
            />

            <Select
                label="카테고리"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as string })}
                options={categoryOptions}
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    태그 (최대 {POST_LIMITS.TAGS_MAX_COUNT}개)
                </label>
                <div className="flex gap-2 mb-2">
                    <Input
                        value={tagInput}
                        onChange={(e) => {
                            setTagInput(e.target.value);
                            setErrors({ ...errors, tags: '' });
                        }}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddTag();
                            }
                        }}
                        placeholder="태그를 입력하고 Enter를 누르세요"
                        maxLength={POST_LIMITS.TAG_MAX_LENGTH}
                        className="flex-1"
                    />
                    <Button type="button" onClick={handleAddTag} variant="outlined">
                        추가
                    </Button>
                </div>
                {errors.tags && (
                    <p className="text-sm text-red-600 mb-2">{errors.tags}</p>
                )}
                <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border border-blue-200 shadow-sm"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                                aria-label={`${tag} 태그 제거`}
                            >
                                <IconX className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outlined" size="small" onClick={onCancel} disabled={isLoading}>
                    취소
                </Button>
                <Button type="submit" variant="contained" size="small" loading={isLoading}>
                    {initialData ? '수정' : '작성'}
                </Button>
            </div>
        </form>
    );
};

