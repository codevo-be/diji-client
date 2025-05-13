import { queryClient } from '@digico/utils'
import { useMutation } from '@tanstack/react-query'

import deleteUpload from '../../../services/upload/delete-upload'

export default function useDeleteUpload() {
    return useMutation({
        mutationFn: deleteUpload,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['uploads']
            });
        },
    });
};