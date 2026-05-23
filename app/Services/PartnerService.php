<?php

namespace App\Services;

use App\Data\PartnerData;
use App\Repositories\Contracts\PartnerRepositoryInterface;
use App\Utils\Sanitizer;
use Illuminate\Support\Collection;

class PartnerService
{
    public function __construct(
        protected PartnerRepositoryInterface $repository
    ) {}

    public function getFilteredPartnersForAdmin(array $filters = [], int $perPage = 10)
    {
        $paginator = $this->repository->getFiltered($filters, $perPage);
        
        return PartnerData::collect($paginator);
    }

    public function getAllPartnersForAdmin(): Collection
    {
        return PartnerData::collect($this->repository->all());
    }

    public function getPartnerById(int $id): ?PartnerData
    {
        $partner = $this->repository->findById($id);
        return $partner ? PartnerData::fromModel($partner) : null;
    }

    public function createPartner(array $data)
    {
        $data = Sanitizer::sanitizeArray($data, ['name']);
        return $this->repository->create($data);
    }

    public function updatePartner(int $id, array $data)
    {
        $data = Sanitizer::sanitizeArray($data, ['name']);
        return $this->repository->update($id, $data);
    }

    public function deletePartner(int $id)
    {
        return $this->repository->delete($id);
    }

    public function getActivePartners(): Collection
    {
        return PartnerData::collect($this->repository->getActive());
    }
}
